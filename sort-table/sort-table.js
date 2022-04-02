/**
 * テーブルにソート機能を与えるJavaScriptライブラリ。
 */

/**
 * theadのセルがクリックされた時に呼ばれる。
 * sort-disableが指定されたセルにはアタッチされていない。
 * @param {Event} e
 */
function sortTable(e){
    //  くりっくされたセル自身、クリックされたセルのあるテーブル内のtbody、クリックされたセルのcellIndex（colNum）を得る
    const cell = e.target;
    const tbody = cell.closest("table").tBodies[0];
    const colNum = cell.cellIndex;

    //  ソートルールを得る
    const rule = (/sortrule-\w+/.test(cell.className))
        ? /sortrule-(\w+)/.exec(cell.className)[1]
        : "string";

    //  tbody内のtrを配列化してrowsに入れる　そーと用
    let rows = Array.from(tbody.querySelectorAll("tr"));

    //  そーと！
    //  rows内のcolNum列を見比べて並び替える
    rows.sort((a, b) => {
        let ac = a.cells[colNum].textContent; 
        let bc = b.cells[colNum].textContent;

        //  ソートルールに関わらず空欄を最後尾に回したり、同値を維持したり。
        if(ac === bc){ return  0; }
        if(ac === ""){ return  1; }
        if(bc === ""){ return -1; }

        //  ルールに従ったソート
        return sortTable[rule](ac, bc);

    });

    //  ソートをトリガーした要素が直前と同じなら降順ソートにする
    //  そうでなければトリガーした要素を記憶して昇順ソートに設定
    if(sortTable.last.element === cell){
        //  ソート順指定の反転と、クラスの変更
        sortTable.last.isAsc = !sortTable.last.isAsc;
        cell.classList.toggle("sort-asc");
        cell.classList.toggle("sort-desc");
    }else{
        //  前回トリガーした要素からクラスを消す
        sortTable.last.element?.classList.remove("sort-asc", "sort-desc");

        //  ソートを昇順に設定して、今回のソートを記録
        cell.classList.add("sort-asc");
        sortTable.last.element = cell;
        sortTable.last.isAsc   = true;
    }
    
    //  ソートしたやつを反映。
    (sortTable.last.isAsc ? rows : rows.reverse()).forEach(tr => tbody.appendChild(tr));

    console.log(
        "clicked: "      + cell.textContent,
        ", cell index: " + colNum,
        ", sort rule: "  + rule,
        ", sort isAsc: " + sortTable.last.isAsc
    );

}

/**
 * 文字列としてソートするぞ！
 * @param {string} a 
 * @param {string} b 
 * @returns 比較結果
 */
sortTable.string = function(a, b){
    return (a < b) ? -1 : 1;
};
/**
 * 数値としてソートするぞ！
 * @param {string} a 
 * @param {string} b 
 * @returns 比較結果
 */
sortTable.number = function(a, b){
    return a - b;
};

/**
 * ソートした対象を記憶する。
 * ソートがトリガーされたものが前回と同じ場合、逆順ソート。
 */
sortTable.last = {
    element : null,
    isAsc   : null
};


/**
 * sortTableを初期化
 * window.onloadのタイミングだけど他のタイミングに使ってもいい
 */
sortTable.init = function(){
    console.log("sortTable.init");

    const tables = document.querySelectorAll("table.sort-target");
    tables.forEach(tbl => {
        //  とりあえず分かりやすくする（仮）
        tbl.style.backgroundColor = "silver";

        //  thead内のtd,thにsorterクラスを追加
        tbl.tHead.querySelectorAll("td, th").forEach(thcell => {
            //  そーとをトリガーしたくないセルはスキップ
            if(thcell.classList.contains("sort-disable")){
                return;
            }

            //  そーとをトリガーするセルだぞ！　と分かるようにするだけのクラス　見た目用
            thcell.classList.add("sort-trigger");
            thcell.addEventListener("click", sortTable);
        })
    })
};

/**
 * addEventListener
 */
window.addEventListener("load", sortTable.init);
