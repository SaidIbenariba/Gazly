export const searchBy = (req, res) => {
  const sql = "SELECT * FROM mission  ";
  //   switch(req.params.searchBy){
  //     case "duration":
  //     console.log(req.body)
  //   }
  console.log(req.body.value);
};
