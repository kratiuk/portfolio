import commentLinkingImage from "@assets/images/commentlinking.webp";
import flashmarkImage from "@assets/images/flashmark.png";

/*
 * Data for projects displayed in the carousel component
 */
export const projects = [
  {
    title: "Comment Linking",
    description: "Extension for Visual Studio Code that allows you to create anchors and links in comments and navigate between them with ease across your entire codebase",
    image: commentLinkingImage,
    imageAlt: "Comment Linking",
    imageClass: "project-image--scaled",
    repoUrl: "https://github.com/kratiuk/commentlinking",
  },
  {
    title: "Flashmark",
    description: "An app built with Kotlin + Jetpack Compose, styled with Material 3, for fast capture of ideas and thoughts without unlocking the device",
    image: flashmarkImage,
    imageAlt: "Flashmark",
    repoUrl: "https://github.com/kratiuk/flashmark",
  },
];
 
