// ========================================
// Firebase Data Store (Server-Side in API Routes)
// ========================================

import { Message, ActivityLog, WishCounter } from "./types";
import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  where,
  runTransaction
} from "firebase/firestore";

export async function getMessages(): Promise<Message[]> {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message));
}

export async function getVisibleMessages(): Promise<Message[]> {
  const q = query(
    collection(db, "messages"),
    where("status", "in", ["visible", "approved"])
  );
  const snapshot = await getDocs(q);
  const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message));
  return msgs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addMessage(
  senderName: string,
  recipient: string,
  message: string
): Promise<Message> {
  const newMessage = {
    senderName,
    recipient,
    message,
    createdAt: new Date().toISOString(),
    status: "visible", // Fast Mode
  };
  const docRef = await addDoc(collection(db, "messages"), newMessage);
  await addActivityLog("Message Board", `ข้อความใหม่จาก ${senderName} ถึง ${recipient}`, "สำเร็จ");
  return { id: docRef.id, ...(newMessage as any) };
}

export async function updateMessageStatus(
  id: string,
  status: Message["status"]
): Promise<Message | null> {
  const docRef = doc(db, "messages", id);
  await updateDoc(docRef, { status });
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Message;
  }
  return null;
}

export async function deleteMessage(id: string): Promise<boolean> {
  await deleteDoc(doc(db, "messages", id));
  return true;
}

// Wish Counter
export async function getWishCounter(): Promise<WishCounter> {
  const docRef = doc(db, "stats", "wishCounter");
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    return { totalWishes: 0, lastUpdated: new Date().toISOString() };
  }
  return snapshot.data() as WishCounter;
}

export async function incrementWishCounter(): Promise<WishCounter> {
  const docRef = doc(db, "stats", "wishCounter");
  const newCounter = { totalWishes: 0, lastUpdated: new Date().toISOString() };
  
  await runTransaction(db, async (transaction) => {
    const docSnap = await transaction.get(docRef);
    if (!docSnap.exists()) {
      newCounter.totalWishes = 1;
      transaction.set(docRef, newCounter);
    } else {
      const current = docSnap.data().totalWishes || 0;
      newCounter.totalWishes = current + 1;
      transaction.update(docRef, newCounter);
    }
  });
  
  return newCounter;
}

export async function resetWishCounter(): Promise<WishCounter> {
  const newCounter = { totalWishes: 0, lastUpdated: new Date().toISOString() };
  await setDoc(doc(db, "stats", "wishCounter"), newCounter);
  return newCounter;
}

// Activity Logs
export async function getActivityLogs(): Promise<ActivityLog[]> {
  const q = query(collection(db, "activityLogs"), orderBy("time", "desc"), limit(50));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ActivityLog));
}

export async function addActivityLog(
  type: ActivityLog["type"],
  detail: string,
  status: ActivityLog["status"]
): Promise<ActivityLog> {
  const log = {
    time: new Date().toISOString(),
    type,
    detail,
    status,
  };
  const docRef = await addDoc(collection(db, "activityLogs"), log);
  return { id: docRef.id, ...(log as any) };
}

// Stats
export async function getStats() {
  const messages = await getMessages();
  const wishCounter = await getWishCounter();
  return {
    totalMessages: messages.filter((m) => m.status !== "hidden").length,
    totalWishes: wishCounter.totalWishes,
  };
}

// CSV Export
export async function exportMessagesCSV(): Promise<string> {
  const messages = await getMessages();
  const header = "ID,Sender,Recipient,Message,CreatedAt,Status";
  const rows = messages.map(
    (m) =>
      `"${m.id}","${m.senderName}","${m.recipient}","${m.message.replace(
        /"/g,
        '""'
      )}","${m.createdAt}","${m.status}"`
  );
  return [header, ...rows].join("\n");
}
