const table = document.getElementById('table');
const cells = Array.from(table.getElementsByTagName('td'));
const song = new Audio('../images/Krestiki_noliki_dve_milany_v_domike.mp3');
let moves = 0
let circleCrossArr = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

song.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

cells.forEach(cell => cell.addEventListener('click', drawSymbol));
function drawSymbol(event){
    let e = event.target
    let row = e.cellIndex;
    let i = parseInt(e.parentElement.id)

    const img = document.createElement('img');
    if (row == undefined) {return}
    if (moves%2 == 0  && e.children.length == 0){
        img.src = '../images/cross.png';
        e.appendChild(img);
        circleCrossArr[i][row] = 1;
        moves++;
    }
    else if(moves%2 != 0 && e.children.length == 0){
        img.src = '../images/circle.png';
        e.appendChild(img);
        circleCrossArr[i][row] = -1;
        moves++;
    }
    song.play();
    checkWin();
}

function checkWin(){
    let [sum_1, sum_2, sum_3] = [0, 0, 0];
    circleCrossArr[0].forEach(num => sum_1 += num);
    circleCrossArr[1].forEach(num => sum_2 += num);
    circleCrossArr[2].forEach(num => sum_3 += num);

    let [sum_4, sum_5, sum_6] = [0, 0, 0];
    circleCrossArr.forEach(row => sum_4 += row[0]);
    circleCrossArr.forEach(row => sum_5 += row[1]);
    circleCrossArr.forEach(row => sum_6 += row[2]);

    let sum_7 = circleCrossArr[0][0] + circleCrossArr[1][1] + circleCrossArr[2][2];
    let sum_8 = circleCrossArr[2][0] + circleCrossArr[1][1] + circleCrossArr[0][2];

    sumArr = [sum_1, sum_2, sum_3, sum_4, sum_5, sum_6, sum_7, sum_8];
    is_crossWin = sumArr.some(sum => sum == 3);
    is_cirlcWin = sumArr.some(sum => sum == -3);
    is_crossWin ? setTimeout(f = () => {alert('Крестики победили')}, 1):
    is_cirlcWin ? setTimeout(f = () => {alert('Нолики победили')}, 1):
    moves == 9 ? setTimeout(f = () => {alert('Ничья')}, 1): {};
    if (is_cirlcWin || is_crossWin || moves == 9){
        cells.forEach(cell => {
            cell.removeEventListener('click', drawSymbol);
        });
        song.pause();
    }
}