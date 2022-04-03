# Software Studio 2022 Spring
## Assignment 01 Web Canvas


### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Basic control tools                              | 30%       | Y         |
| Text input                                       | 10%       | Y         |
| Cursor icon                                      | 10%       | Y         |
| Refresh button                                   | 5%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Different brush shapes                           | 15%       | Y         |
| Un/Re-do button                                  | 10%       | Y         |
| Image tool                                       | 5%        | Y         |
| Download                                         | 5%        | Y         |

| **Other useful widgets**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Name of widgets                                  | 1~5%     | N         |


---

### How to use 

    ![avatar]()
    ![avatar]()
    - 如圖所示，選中筆刷、橡皮擦，可以在左邊的畫布上點按移動進行繪畫。
    - 選中文本工具，可以在畫布上點擊想要輸入文字的位置，然後在輸入完畢後按下Enter。
    - 選中形狀工具，可以在畫布上拖拽畫出形狀。
    - 選中圖片上傳工具，可以通過在畫布上點擊相應位置，把使用者上傳的圖片貼上去。
    - 點擊下載工具，可以把畫布上的圖案保存為背景透明的.png格式圖片。

### Function description

    | Basic control tools |
    - Brush
        * 使用addEventListener()，當user在畫布範圍內有mouse down的動作，設立一個flag=true表示開始進行畫畫/擦除等動作
        * 當mouse move event出現，使用canvas的path和lineTo方法畫出線條
        * 當mouse up或者mouse leave event出現，將剛才的flag改為false，表示一次繪畫動作的結束，並用recordHistory()記錄畫布的改變
    - Eraser
        * 實作方式跟Brush相似，只是在mouse move event的處理上，使用clearRect()對畫布內容進行擦除
    - Color Selector
        * Color Selector我是通過html提供的<input type="color" />來實現的
        * 後續通過對這個input element的addEventListener()來實時更新color的值
    - Simple Menu: Brush Size
        * 我通過html提供的<input type="range" />來讓user對筆刷、橡皮擦的Size做調整
        * 後續同樣對這個input element使用addEventListener()更新Size的大小

    | Text input |
    - 通過create element弄出text box提供user輸入，並處理key down event
    - 當接收到Enter按下的keycode，把文字內容畫到canvas上
    - 用removeChild()去除這個element，結束輸入

    | Cursor icon |
    - index.css中我對不同的className設置了不同的cursor顯示
    - 在index.js通過buttonOnClick()更改html的className
    - 網頁根據當前className呈現對應的cursor icon

    | Refresh button |
    - 當監測到clear button被按下，使用canvas的clearRect方法清空畫布

    | Different brush shapes |
    - 通過起始點和當前坐標點的差，分別計算出繪製圓形、方形和三角形的數值
    - 圓形用到canvas的arc()方法
    - 方形用到fillRect()方法
    - 三角形使用Path和lineTo進行繪製
    - 每次更新畫面都讀取上一步的畫布內容重新繪製圖形，達成形狀可以跟隨拖拽動作改變大小的效果
    - 建立一個canvasTemp在上面進行作畫，通過雙緩衝的方式解決畫面閃爍的問題

    | Un/Re-do button |
    - 建立一個canvasList，用recordHistory()記錄下每一步的畫布內容，根據需求進行回退操作
    - 畫面閃爍的處理方法跟上述類似

    | Image tool |
    - 使用html提供的<input type="file">來讀取user的文件
    - handleImage()保存圖片內容
    - addEventListener()在讀取到mouse down event時，使用canvas的drawImage()達成粘貼圖片的效果

    | Download |
    - 當按鈕被按下，document.create一個element，link到最新儲存的畫布內容，設定好下載的fileName
    - 然後呼出這個element的click() event

    | Appearance |
    - 以.css為主，.html和.js為輔
    - 使用background-image添加背景、給功能按鈕添加icon
    - 通過script對brush size、font setting等內容進行了一下包裝，只會顯示當前使用功能的setting

### Firebase page link

    https://web-canvas-658b3.firebaseapp.com/

### Others (Optional)

    Other useful widgets的部分我沒有做，助教可以不用找，謝謝

<style>
table th{
    width: 100%;
}
</style>