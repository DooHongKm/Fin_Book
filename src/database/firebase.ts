import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAV2RQLC_bjhXfuvXEyiwWNovp53efKE4U",
  authDomain: "fin-book-39ba8.firebaseapp.com",
  projectId: "fin-book-39ba8",
  storageBucket: "fin-book-39ba8.appspot.com",
  messagingSenderId: "826334548531",
  appId: "1:826334548531:web:419375cc0065b456860946",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// DB 다운로드
// interface items {
//   name: string;
// }
// const App: React.FC = () => {
//   const [data, setData] = useState<items>({ name: "a_items" });
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const docRef = doc(db, "items", "a");
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setData(docSnap.data() as items);
//           console.log("DB connecting success");
//         } else {
//           console.log("No DB");
//         }
//       } catch (error) {
//         console.error("DB connecting fail", error);
//       }
//     };
//     fetchData();
//   }, []);
//   return (
//     <div>
//       <p>{data.name}</p>
//     </div>
//   );
// };

// DB 업로드
// const App: React.FC = () => {
//   const [userId, setUserId] = useState<string>("");
//   const [name, setName] = useState<string>("");
//   const [age, setAge] = useState<number>(0);
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//       // 사용자 ID에 해당하는 문서 참조를 생성
//       const docRef = doc(db, "users", userId);
//       // 문서에 데이터 설정
//       await setDoc(docRef, {
//         name: name,
//         age: age,
//       });
//       console.log("Document written with ID: ", userId);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };
//   return (
//     <div>
//       <h1>Upload Data to Firestore</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>User ID:</label>
//           <input
//             type="text"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Age:</label>
//           <input
//             type="number"
//             value={age}
//             onChange={(e) => setAge(Number(e.target.value))}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };
