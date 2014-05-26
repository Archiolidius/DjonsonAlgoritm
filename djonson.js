$(document).ready(function () {
    var countEquip = 0;
    var countDetail = 0;
    var tableTime;

    $(document).ready(function () {
        countEquip = $("#countEquip").val();
        countDetail = $("#countDetail").val();

        genTableTime("#tableTime", countEquip, countDetail);
    });
    $("#countEquip, #countDetail").on("change", function () {
        countEquip = $("#countEquip").val();
        countDetail = $("#countDetail").val();

        genTableTime("#tableTime", countEquip, countDetail);
    });

// Початок обчислень
    $("#startButton").on("click", function () {
        readTableTime();
        //Якщо к-сть обладнання 3
        if (countEquip == 3) {
            resolvedForE3();
            gantDiagram();
        }
    });

// Обчислення для 3 одиниць обладнання
    function resolvedForE3() {
        sortT();
    };

//Фунція сортування деталей в правильному порядку
    function sortT(arr1, arr2) {
        var arrTemp1 = Array();
        var arrTemp2 = Array();

        for (var i = 0; i < countDetail; i++) {
            if ((tableTime[i][1] + tableTime[i][2]) < (tableTime[i][2] + tableTime[i][3])) {
                arrTemp1[arrTemp1.length] = tableTime[i];
            }
            ;
            if ((tableTime[i][1] + tableTime[i][2]) >= (tableTime[i][2] + tableTime[i][3])) {
                arrTemp2[arrTemp2.length] = tableTime[i];
            }
            ;
        }
        ;

        arrTemp1.sort(sT1T2);
        arrTemp2.sort(sT2T3);

        tableTime = Array();
        for (var i = 0; i < arrTemp1.length; i++) {
            tableTime[tableTime.length] = arrTemp1[i];
        }
        for (var i = 0; i < arrTemp2.length; i++) {
            tableTime[tableTime.length] = arrTemp2[i];
        }

        //Вивід в таблицю
        genTableData("#table1", tableTime);
    };

//Сортування за сумою 1 та 2
    function sT1T2(a, b) {
        if (a[1] + a[2] > b[1] + b[2]) return 1;
        else if (a[1] + a[2] < b[1] + b[2]) return -1;
        else return 0;
    };

//Сортування за сумою 2 та 3
    function sT2T3(a, b) {
        if (a[2] + a[3] < b[2] + b[3]) return 1;
        else if (a[2] + a[3] > b[2] + b[3]) return -1;
        else return 0;
    };

// Генерація таблиці часу обробки
    function genTableTime(nameTable, m, n) {
        $(nameTable).html("");
        var htmlTemp = "";

        for (var i = 0; i < n; i++) {
            htmlTemp = "<tr>"
            for (var j = 0; j < m; j++) {
                htmlTemp += "<td><input type='number' value='1' min='1'></td>";
            }
            ;
            htmlTemp += "</tr>";
            $(nameTable).append(htmlTemp);
        }
        ;
    };

// Генерація таблиці з даними
    function genTableData(nameTable, arrT) {
        $(nameTable).html("");
        var htmlTemp = "";

        for (var i = 0; i < arrT.length; i++) {
            htmlTemp = "<tr>"
            for (var j = 0; j < arrT[i].length; j++) {
                htmlTemp += "<td>" + arrT[i][j] + "</td>";
            }
            ;
            htmlTemp += "</tr>";
            $(nameTable).append(htmlTemp);
        }
        ;
    };

// Читання таблиці часу обробки
    function readTableTime() {
        tableTime = Array();
        $("#tableTime tr").each(function (i, v) {
            tableTime[i] = Array();
            tableTime[i][0] = i + 1; //Запис в перший стовбець номеру деталі
            $(this).children('td').each(function (ii, vv) {
                tableTime[i][ii + 1] = parseInt($(this).find("input").val());
            });
        });
    };

    /*------------ Gant digram ---------*/
    function gantDiagram() {
        var curDetLenght = 0,
            tbody = $('.gantDiagram');


        for (var i = 0; i < tableTime.length; i++) {
            curDetLenght = 0;

            curDetLenght = (function () {
                for (var j = 1; j < tableTime[i].length; j++) {
                    curDetLenght += tableTime[i][j];
                }
                console.log('curLenght:' + curDetLenght);
                return curDetLenght;
            }());

//            for (var k = 0; k < curDetLenght; k++) {
//                $('.equip-' + i).append('<td>' + k + '</td>')
//            }

        }
        for (var i = 1; i <= countEquip; i++) {
            tbody.append('<tr class="gwm-' + i + '"></tr>');
        }
        /*for first GWM*/
        var eq1Prostoy = [],
            eq2Prostoy = [],
            pos = [],
            pos2 = [],
            pos2_2 = [],
            pos1 = [],
            poz2 = [];
//
        for (var k = 0; k < countDetail; k++) {
            for (var i = 0; i < tableTime[k][1]; i++) {
                tbody.find('.gwm-1').append('<td class="det-' + (k + 1) + '">' + tableTime[k][0] + '</td>');
            }
            pos1[k] = tableTime[k][1];
            poz2[k] = tableTime[k][2];
        }
        eq1Prostoy.push(tableTime[0][1]);
        eq2Prostoy.push(tableTime[0][1]);
        poz2.unshift((tableTime[0][2])+(tableTime[0][1]));
        pos.push(tableTime[0][1]);
        pos2.push(tableTime[0][2]); //позицыя 2 гвм
        pos2_2.push((tableTime[0][2])+(tableTime[0][3])+(tableTime[0][1])); //позицыя 3 гвм

        /*for first GWM*/

        /*for else GWM*/

        for (var k = 0; k < countDetail; k++) {
            for (var j = 1; j < countEquip; j++) {
                if (j == 1) {
                    var prev_poz = 0;
                    for (var i = 0; i <= k; i++) {
                        prev_poz += pos1[i];
                    }
//                    console.log(pos[pos.length - 1]);
//                    console.log(prev_poz);
                    while ((pos[pos.length - 1] < prev_poz) && (k != 0)) {
                        tbody.find('.gwm-' + (j + 1)).append('<td></td>');
                        pos[pos.length - 1] = pos[pos.length - 1] + 1;
                        poz2[0]++;
                    }
                    for (var z = 0; z < eq1Prostoy[eq1Prostoy.length - 1]; z++) {
                        tbody.find('.gwm-' + (j + 1)).append('<td></td>');
                    }
                    for (var i = 0; i < tableTime[k][j + 1]; i++) {
                        tbody.find('.gwm-' + (j + 1)).append('<td class="det-' + (k + 1) + '">' + (tableTime[k][0]) + '</td>');
                    }

                    eq1Prostoy.push(eq1Prostoy[eq1Prostoy.length - 1] + tableTime[k][j + 1]);
                    eq2Prostoy.push(eq2Prostoy[eq2Prostoy.length - 1] + tableTime[k][j + 1]);
                    pos[pos.length - 1] = pos[pos.length - 1] + tableTime[k][j + 1];
//                    pos2_2.push(pos2_2[pos2_2.length - 1] + tableTime[k][j+1]);
//                    pos2.push(pos2[pos2.length - 1] + tableTime[k][j+1]);
//                    pos2[pos2.length - 1] = pos2[pos2.length - 1] + tableTime[k][j + 1];
//                    pos2.push(tableTime[k][j+1]);
                }
                if (j == 2) {
                    var prev_poz = 0;
                    if(k!=0){
                    pos2_2[pos2_2.length - 1] = pos2_2[pos2_2.length - 1] + tableTime[k][j+1];
                    }
                    for (var i = 0; i <= k+1; i++) {
                        prev_poz += poz2[i];
                    }
                    console.log(pos2_2[pos2_2.length - 1]);
                    console.log(prev_poz);
                    while ((pos2_2[pos2_2.length - 1] < prev_poz) && (k != 0)) {
                        tbody.find('.gwm-' + (j + 1)).append('<td></td>');
                        pos2_2[pos2_2.length - 1] = pos2_2[pos2_2.length - 1] + 1;
                    }
                    for (var z = 0; z < eq2Prostoy[eq2Prostoy.length - 1]; z++) {
                        tbody.find('.gwm-' + (j + 1)).append('<td></td>');
                    }
                    for (var i = 0; i < tableTime[k][j + 1]; i++) {
                        tbody.find('.gwm-' + (j + 1)).append('<td class="det-' + (k + 1) + '">' + (tableTime[k][0]) + '</td>');
                    }


                }
            }
            eq1Prostoy = [];
            eq2Prostoy = [];
        }
        /*for else GWM*/
    }

    /*--------- Gant digram end---------*/
});