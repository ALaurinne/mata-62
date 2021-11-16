// Initialize Cloud Firestore through Firebase
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, DocumentData, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore";
import { Region, Room, AppUser } from '../classes/collections.classe';
import "../configs/firebase.config";


const db = getFirestore();

export const getAll = async (
    req: { collection: string }
): Promise<Object> => {
    const c = collection(db, req.collection);
    const querySnapshot = await getDocs(c);
    let temp: Object[] = [];
    querySnapshot.forEach(k => temp.push({
        uid: k.id,
        ...k.data(),
    }));
    return temp;
}

export const getRoomsFromRegion = async (
    req: { region: string }
): Promise<DocumentData[]> => {
    const c = collection(db, "rooms");
    const q = query(c, where("region", "==", req.region));
    let temp: DocumentData[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(k => temp.push(k.data()));
    return temp;
}

// export const getUsersFromRegion = async (
//     req: { collection: string, region: string }
//     ): Promise<DocumentData[]> => {
//     const c = collection(db, req.collection);
//     const q = query(c, where("region", "==", req.region));
//     let temp: DocumentData[] = [];
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach(k => temp.push(k.data()));
//     return temp;
// }

export const createRegion = async (region: Region) => {
    const c = collection(db, "regions");
    await updateDoc(doc(c, "regionsList"), {
        regions: arrayUnion(region.name),
    });
}

export const createRoom = async (room: Room) => {
    let roomId = room.region + ' - ' + room.name;
    const c = collection(db, "rooms");
    await setDoc(doc(c, roomId), room);
}

export const createUser = async (user: AppUser) => {
    if (user.uid) {
        const c = collection(db, "users");
        await setDoc(doc(c, user.uid), {
            email: user.email,
            name: user.name,
            role: null,
            regions: [],
            active: true,
        });
    }
}

export const createOrUpdateRoleSolicitation = async (user: AppUser) => {
    if (user.uid) {
        const c = collection(db, "roleSolicitations");
        await setDoc(doc(c, user.uid), {
            role: user.role,
        });
    }
}

export const updateRoomActivation = async (room: Room) => {
    if (room.uid) {
        const c = collection(db, "rooms");
        await updateDoc(doc(c, room.uid), {
            active: room.active,
        });
    }
}

export const includeUserInRegion = async (user: AppUser) => {
    if (user.uid && user.regions) {
        const c = collection(db, "users");
        await updateDoc(doc(c, user.uid), {
            regions: arrayUnion(user.regions[0]),
        });
    }
}

export const removeUserFromRegion = async (user: AppUser) => {
    if (user.uid && user.regions) {
        const c = collection(db, "users");
        await updateDoc(doc(c, user.uid), {
            regions: arrayRemove(user.regions[0]),
        });
    }
}

export const updateUserRole = async (user: AppUser) => {
    const c = collection(db, "users");
    await updateDoc(doc(c, user.uid), {
        role: user.role || null,
    });
}

export const updateUserActivation = async (user: AppUser) => {
    const c = collection(db, "users");
    await updateDoc(doc(c, user.uid), {
        active: user.active || null,
    });
}

export const deleteRegion = async (region: Region) => {
    const d = doc(db, "regions", "regionsList");
    await updateDoc(d, {
        regions: arrayRemove(region.name),
    });

    // const c = collection(db, "rooms");
    // const q = query(c, where("region", "==", region.name));

    // const batch = writeBatch(db);
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach(k => batch.delete(k.ref));
    // await batch.commit();
}

export const deleteRoom = async (req: { room: string, region: string }) => {
    const c = collection(db, "rooms");
    const q = query(c, where("name", "==", req.room), where("region", "==", req.region));

    const batch = writeBatch(db);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async k => batch.delete(k.ref));
    await batch.commit();
}

export const deleteRoleSolicitation = async (user: AppUser) => {
    if (user.uid) {
        const c = collection(db, "roleSolicitations");
        await deleteDoc(doc(c, user.uid));
    }
}