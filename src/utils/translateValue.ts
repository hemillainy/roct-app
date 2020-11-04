const translateValue = (value: string) => {
  switch (value.toLowerCase()) {
    case "item":
      return "Item"
    case "account":
      return "Conta"
    case "gold":
      return "Ouro"
    default:
      return value
  }
};

export default translateValue;