

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');
const AsyncStorage = require('@react-native-async-storage/async-storage');


const firebaseConfig = {
  apiKey: "AIzaSyCMZXzb0vl37s9_m1xqBudlLhVm4k6pYGw",
  authDomain: "e-learn-app-53b7a.firebaseapp.com",
  projectId: "e-learn-app-53b7a",
  storageBucket: "e-learn-app-53b7a.appspot.com",
  messagingSenderId: "186564348808",
  appId: "1:186564348808:web:ca7f2c8c48b86bf7c8483d",
  measurementId: "G-F2KJBWN143"
};

const firebase_app = initializeApp(firebaseConfig);

const firebase_db = getFirestore(firebase_app);

const firebase_auth = getAuth(firebase_app);

const coursesData = {
  "MECH-HS5151": {
    course_name: "Technical English",
    dept_name: "MECH",
    years: "1",
    sem: "1"
  },
  "MECH-PH5151": {
    course_name: "Engineering Physics",
    dept_name: "MECH",
    years: "1",
    sem: "1"
  },
  "MECH-MA5158": {
    course_name: "Engineering Mathematics I",
    dept_name: "MECH",
    years: "1",
    sem: "1"
  },
  "MECH-CY5151": {
    course_name: "Engineering Chemistry",
    dept_name: "MECH",
    years: "1",
    sem: "1"
  },
  "MECH-GE5151": {
    course_name: "Engineering Graphics",
    dept_name: "MECH",
    years: "1",
    sem: "1"
  },
  "MECH-MA5252": {
    course_name: "Engineering Mathematics II",
    dept_name: "MECH",
    years: "1",
    sem: "2"
  },
  "MECH-ME5251": {
    course_name: "Manufacturing Processes",
    dept_name: "MECH",
    years: "1",
    sem: "2"
  },
  "MECH-GE5152": {
    course_name: "Engineering Mechanics",
    dept_name: "MECH",
    years: "1",
    sem: "2"
  },
  "MECH-GE5153": {
    course_name: "Problem Solving and Python Programming",
    dept_name: "MECH",
    years: "1",
    sem: "2"
  },
  "MECH-EE5251": {
    course_name: "Basics of Electrical and Electronics Engineering",
    dept_name: "MECH",
    years: "1",
    sem: "2"
  },
  "MECH-CE5251": {
    course_name: "Fluid Mechanics and Machinery",
    dept_name: "MECH",
    years: "1",
    sem: "2"
  },
  "MECH-MA5355": {
    course_name: "Transform Techniques and Partial Differential Equations",
    dept_name: "MECH",
    years: "2",
    sem: "3"
  },
  "MECH-ML5352": {
    course_name: "Mechanics of Materials",
    dept_name: "MECH",
    years: "2",
    sem: "3"
  },
  "MECH-ME5301": {
    course_name: "Engineering Thermodynamics",
    dept_name: "MECH",
    years: "2",
    sem: "3"
  },
  "MECH-ME5351": {
    course_name: "Computer Aided Design",
    dept_name: "MECH",
    years: "2",
    sem: "3"
  },
  "MECH-ML5351": {
    course_name: "Engineering Materials and Metallurgy",
    dept_name: "MECH",
    years: "2",
    sem: "3"
  },
  "MECH-ME5451": {
    course_name: "Hydraulics and Pneumatics",
    dept_name: "MECH",
    years: "2",
    sem: "4"
  },
  "MECH-ME5401": {
    course_name: "Theory of Machines",
    dept_name: "MECH",
    years: "2",
    sem: "4"
  },
  "MECH-ME5402": {
    course_name: "Metal Cutting and Machine Tools",
    dept_name: "MECH",
    years: "2",
    sem: "4"
  },
  "MECH-ME5403": {
    course_name: "Applied Thermodynamics",
    dept_name: "MECH",
    years: "2",
    sem: "4"
  }
};

  

const addCoursesToFirestore = async () => {
  for (const [courseId, courseData] of Object.entries(coursesData)) {
    try {

      const courseRef = doc(collection(firebase_db, 'Courses'), courseId);

      await setDoc(courseRef, courseData);

      console.log(`${courseId} successfully written!`);
    } catch (error) {
      console.error(`Error writing ${courseId}: `, error);
    }
  }
};

addCoursesToFirestore();
