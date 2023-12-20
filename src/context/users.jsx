import { createContext, useState, useEffect } from "react";
import { googleProvider, db, storage } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { getDocs, collection, addDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage';



const UserContext = createContext();

const Provider = ({ children }) => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserConnected(user.email)
        } else {
            console.log("problem")
        }
    });

    const [userConnected, setUserConnected] = useState(null);
    const [resumeList, setResumeList] = useState([]);
    const resumeCollectionRef = collection(db, "resumes");
    const storage = getStorage();
    const imagesRef = ref(storage, 'resumeBuilderImages/1.jpeg');
    const [downloadImg, setDownloadImg] = useState("first");

    const signUpEmailPassword = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err);
        }
    }

    const signInGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.log(err);
        }
    }

    const signInEmailPassword = async (email, password) => {
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // setUserConnected(userCredential.user.email);
                console.log(userConnected, " logged in");
            })
            .catch((err) => {
                console.log("code: ", err.code);
                console.log("msg: ", err.message);
            });
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            console.log(userConnected, " logged out")
            setUserConnected(null);
        } catch (err) {
            console.log(err);
        }
    }

    const getResumeList = async () => {
        try {
            getDocs(resumeCollectionRef)
                .then((snapshot) => {
                    let resumes = [];
                    snapshot.docs.forEach((doc) => {
                        resumes.push({ ...doc.data(), id: doc.id });
                    })
                    setResumeList(resumes);
                })
        } catch (err) {
            console.log(err);
        }
    }

    const getResumeByUser = async () => {
        try {
            const q = query(resumeCollectionRef, where("userId", "==", userConnected));
            const querySnapshot = await getDocs(q);
            let resumes = [];
            querySnapshot.forEach((doc) => {
                resumes.push({ ...doc.data(), id: doc.id });
            });
            setResumeList(resumes);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getResumeByUser();
    }, [userConnected]);

    const addResume = async (resume) => {
        try {
            await addDoc(resumeCollectionRef, resume);
        } catch (err) {
            console.log(err);
        }
    }

    const uploadFile = async (fileToUpload) => {
        if (!fileToUpload) return;
        const filesFolderRef = ref(storage, `resumeBuilderImages/${fileToUpload.name}`);
        try {
            await uploadBytes(filesFolderRef, fileToUpload);
        } catch (err) {
            console.log(err);
        }
    }

    const downloadFile = async () => {
        try {
            const url = await getDownloadURL(imagesRef);
            setDownloadImg(url);
            console.log("di: ", downloadImg);
        } catch (error) {
            console.error('Error getting download URL:', error);
        }
    };

    const shared = { userConnected, signUpEmailPassword, signInGoogle, signInEmailPassword, logOut, resumeList, addResume, getResumeList, getResumeByUser, uploadFile, downloadImg }
    return (
        <UserContext.Provider value={shared}>
            {children}
        </UserContext.Provider>
    )
}

export { Provider }
export default UserContext