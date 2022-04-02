# table-sort.js

テーブルにソート機能を与えるJavaScriptライブラリ。

ソート機能を与えたいtableで、class="sort-target"とする。  
見出し行としてのtheadと、ソート対象データを含むtbodyがひとつずつ必要。

thead内のセルに、クリックイベントとしてソート機能が登録される。  
このときsort-disableがある場合は無視される。  
いくつかのクラスで特定のソートルールを指定する。  
ルールが指定されていなければ、sortrule-stringとして扱われる。    
※いずれのルールでも空文字列は最後尾に回される。
* sortrule-string  
文字列として扱う
* sortrule-number  
数値として扱う

 
 
## ライブラリでDOM操作だとかに使うクラス

#### 自分で適用しておかないといけないやつ
* sort-target  
これが適用されたtableにソート機能が与えられる。
* sort-disable  
triggerになってほしくないセルに予め適用しておく。
* sortrule-string  
thead内のセルに指定する。文字列としてソートする。
* sortrule-number  
thead内のセルに指定する。数値としてソートする。

#### 自動で追加されるやつ
* sort-trigger  
クリックするとソート機能が動くセル。
* sort-asc  
昇順でソートされている列。
* sort-desc  
降順でソートされている列。
