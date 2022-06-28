(function(){

  let MAIN = function(){
    this.set_event();
  };

  // イベント設定
  MAIN.prototype.set_event = function(){
    let button = this.get_start_button();
    if(button){
      button.addEventListener("click" , this.click_start.bind(this));
    }
    let table = this.get_game_table();
    if(table){
      table.addEventListener("click" , this.click_table.bind(this));
    }
  };

  // スタートボタンクリック
  MAIN.prototype.click_start = function(){
    let result = confirm("先攻にしますか？");
    if(result === true){
      this.first  = "player";
      this.second = "computer";
    }
    else{
      this.first  = "computer";
      this.second = "player";
    }
    this.clear();
    this.game_start();
  };
  
  // 要素の取得
  MAIN.prototype.get_start_button = function(){
    return document.querySelector("button.kaishi");
  };
  MAIN.prototype.get_game_table = function(){
    return document.querySelector("table.main");
  };
  MAIN.prototype.get_game_cells = function(){
    let table = this.get_game_table();
    if(!table){
      console.log("Error !");
      return;
    }
    return table.querySelectorAll("td");
  };

  // 情報の初期化
  MAIN.prototype.clear = function(){
    this.count = 0;
    let cells = this.get_game_cells();
    for(let cell of cells){
      cell.textContent = "";
    }
  };

  // ゲーム開始
  MAIN.prototype.game_start = function(){
    switch(this.first){
      case "player":
        console.log("先攻で開始します");
        break;

      case "computer":
        console.log("後攻で開始します");
        this.proc_computer();
        break;

      default:
        console.log("Error!");
        break;
    }
  };

  // プレイヤーがマス目をクリックした時の処理
  MAIN.prototype.click_table = function(e){
    if(!this.first){
      console.log("Error !");
      return;
    }
    let target = e.target;
    if(target.tagName !== "TD"){
      console.log("Error !");
      return;
    }

    // すでに値が書き込まれていると何もしない
    if(target.textContent !== ""){
      console.log("Error !");
      return;
    }

    // 自分の番を判定
    if(this.first === "player" && (this.count % 2)){
      console.log("Error !");
      return;
    }
    else if(this.first === "computer" && !(this.count % 2)){
      console.log("Error !");
      return;
    }

    // 後攻
    if(this.count % 2){
      target.textContent = "✗";
    }
    // 先攻
    else{
      target.textContent = "○";
    }

    let res = this.check();
    if(res === true){
      this.proc_computer();
    }
  };

  // コンピュータの番
  MAIN.prototype.proc_computer = function(){
    let cells = this.get_game_cells();
    if(!cells || !cells.length){
      console.log("Error !");
      return;
    }

    // 記号がおけるマスの一覧を取得
    let empty = [];
    for(let i=0; i<cells.length; i++){
      if(!cells[i].textContent){
        empty.push(i);
      }
    }
    if(!empty.length){
      return;
    }

    // 空欄にランダムで記号をセット
    let rnd = Math.floor(Math.random() * empty.length);

    // 後攻
    if(this.count % 2){
      cells[empty[rnd]].textContent = "✖";
    }
    // 先攻
    else{
      cells[empty[rnd]].textContent = "◯";
    }

    this.check();
  };


  // 
  MAIN.prototype.check = function(){
    let cells = this.get_game_cells();
    if(!cells || !cells.length){
      console.log("Error !");
      return;
    }

    // 配置されている記号を配列に格納する。
    let empty_count = 0;
    let datas = [];
    for(let i=0; i<cells.length; i++){
      datas.push(cells[i].textContent);
      if(!cells[i].textContent){
        empty_count++;
      }
    }

    let winner = (this.count % 2) ? this.second : this.first;
    
    // ３つ並んでいるかチェックする
    if(this.check_line(datas)){
      this.game_over(winner);
    }
    // 引き分け処理
    else if(empty_count === 0){
      this.game_over();
      return;
    }

    // 相手の番に変更する
    else{
      this.count++;
      return true;
    }
  };

  // マス目のデータをもとに、縦横ナナメ一列に並んでいるかどうかを返す処理
  let pattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  MAIN.prototype.check_line = function(datas){
    if(!datas){return null;}
    for(let i=0; i<pattern.length; i++){
      if(!datas[pattern[i][0]]){continue;}
      if(datas[pattern[i][0]] === datas[pattern[i][1]]
      && datas[pattern[i][0]] === datas[pattern[i][2]]){
        return datas[pattern[i][0]];
      }
    }
    return false;
  };

  MAIN.prototype.game_over = function(winner){
    if(winner === "player"){
      setTimeout((function(){
        alert("かち");
      }).bind(this),100);
    }
    else if(winner === "computer"){
      setTimeout((function(){
        alert("まけ");
      }).bind(this),100);
    }
    else{
      setTimeout((function(){
        alert("引き分け");
      }).bind(this),100);
    }
  };

  // 起動処理
  if(document.readyState === "complete"){
    new MAIN();
  }
  else{
    window.addEventListener("load" , function(){new MAIN()});
  }
  
})();
