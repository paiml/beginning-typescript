// Shows a nickname if there is one, and the name if not.
type User = { name: string; nickname?: string };

const ada: User = { name: "Ada" };
const shown = ada.nickname?.trim() ?? ada.name;
console.log(shown);
