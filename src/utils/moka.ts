export const getMokaImgUrl = (type: "cute" | "sexy" | "teasing"): string => {
  switch (type) {
    case "cute":
      return " https://www.anime-planet.com/images/characters/3679.jpg?t=1513437618";
    case "sexy":
      return "https://upload.wikimedia.org/wikipedia/en/4/45/Moka_Akashiya.png";
    case "teasing":
      return "https://emoji.gg/assets/emoji/4834_moka_wink.png";
  }
};
