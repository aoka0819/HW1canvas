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

    ![image](/pic/webPage.png)
    ![image](/pic/howToUse.png)
    - 如圖所示，選中筆刷、橡皮擦，可以在左邊的畫布上點按移動進行繪畫。
    - 選中文本工具，可以在畫布上點擊想要輸入文字的位置，然後在輸入完畢後按下Enter。
    - 選中圖片上傳工具，可以通過在畫布上點擊相應位置，把使用者上傳的圖片貼上去。
    - 點擊下載工具，可以把畫布上的圖案保存為背景透明的.png格式圖片。

### Function description

    | Basic control tools |
    - Brush
        * 我
    - Eraser
    - Color Selector
        * Color Selector我是通過html提供的<input type="color" />來實現的
        * 後續通過對這個input element的addEventListener()來實時更新color的值
    - Simple Menu: Brush Size
        * 我通過html提供的<input type="range" />來讓user對筆刷、橡皮擦的Size做調整
        * 後續同樣對這個input element使用addEventListener()更新Size的大小

    Text input

    Cursor icon

    Refresh button

    Different brush shapes

    Un/Re-do button

    Image tool

    Download

    Appearance

### Firebase page link

    your web page URL.

### Others (Optional)

    Anythinh you want to say to TAs.

<style>
table th{
    width: 100%;
}
</style>