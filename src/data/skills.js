import dartIcon from "@assets/icons/technologies/dart.svg";
import expoIcon from "@assets/icons/technologies/expo.svg";
import flutterIcon from "@assets/icons/technologies/flutter.svg";
import goIcon from "@assets/icons/technologies/go.svg";
import javascriptIcon from "@assets/icons/technologies/javascript.svg";
import nextjsIcon from "@assets/icons/technologies/nextjs.svg";
import pythonIcon from "@assets/icons/technologies/python.svg";
import reactIcon from "@assets/icons/technologies/react.svg";
import supabaseIcon from "@assets/icons/technologies/supabase.svg";
import tailwindIcon from "@assets/icons/technologies/tailwind.svg";
import typescriptIcon from "@assets/icons/technologies/typescript.svg";
import vueIcon from "@assets/icons/technologies/vue.svg";

export const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "TypeScript", icon: typescriptIcon },
      { name: "JavaScript", icon: javascriptIcon },
      { name: "Python", icon: pythonIcon },
      { name: "Dart", icon: dartIcon },
      { name: "Go", icon: goIcon },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "Vue.js", icon: vueIcon },
      { name: "React", icon: reactIcon },
      { name: "Next.js", icon: nextjsIcon },
      { name: "Tailwind CSS", icon: tailwindIcon },
    ],
  },
  {
    title: "Mobile",
    skills: [
      { name: "Flutter", icon: flutterIcon },
      { name: "React Native", icon: reactIcon },
      { name: "Expo", icon: expoIcon, invertOnDark: true },
    ],
  },
  {
    title: "Backend",
    skills: [{ name: "Supabase", icon: supabaseIcon }],
  },
];
