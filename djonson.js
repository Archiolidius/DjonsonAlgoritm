$(document).ready(function () {
    var countEquip = 0;
    var countDetail = 0;
    var tableTime;
    var allTime = 0;
    var stopGVM2 = 0;
    var stopGVM3 = 0;
    var waitOnCVM2 = Array();
    var waitOnCVM3 = Array();

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
        $('#result').show();
        $('.gantDiagram').html('').show();
        $('#diagram').show();
        $('.end-rozr').show();

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
        timeZagal(3);
        yakistPok(3);
    };

// Показники якості
    function yakistPok(gvm) {
        min1(gvm);
        min2(gvm);
        min3(gvm);

        optymiz1(gvm);
        optymiz2(gvm);
        optymiz3(gvm);
        optymiz4(gvm);
        optymiz5(gvm);
        optymiz6(gvm);
        optymiz7(gvm);

        minVyr1(gvm);
        minVyr2(gvm);
        minVyr3(gvm);
        minVyr4(gvm);
        minVyr5(gvm);
    }

// мінімізація незавершеного в-ва
    function minVyr1(gvm) {
        if (gvm == 3) {
            $("#minVyr1").html('max(max{');
            var intervalID = setInterval(function () {
                if (waitOnCVM2.length && waitOnCVM3.length) {
                    var arrTemp = waitOnCVM2.concat(waitOnCVM3);
                    $.each(arrTemp, function (index, value) {
                        if (value != undefined && value != "") {
                            $("#minVyr1").append(value);
                            if (index != (arrTemp.length - 1))
                                $("#minVyr1").append(", ");
                        }
                        ;
                    });
                    $("#minVyr1").append("})=" + maxArr(arrTemp));
                    clearInterval(intervalID);
                }
                ;
            }, 100)

        } else {

        }
    }

    function minVyr2(gvm) {
        if (gvm == 3) {
            $("#minVyr2").html('max(max{');
            var intervalID = setInterval(function () {
                if (waitOnCVM2.length && waitOnCVM3.length) {
                    var arrTemp = waitOnCVM2.concat();
                    $.each(waitOnCVM3, function (index, value) {
                        if (arrTemp[index] != undefined) {
                            arrTemp[index] += value;
                        } else {
                            arrTemp[index] = value;
                        }
                    });
                    $.each(arrTemp, function (index, value) {
                        if (value != undefined && value != "") {
                            $("#minVyr2").append(value);
                            if (index != (arrTemp.length - 1))
                                $("#minVyr2").append(", ");
                        }
                        ;
                    });
                    $("#minVyr2").append("})=" + maxArr(arrTemp));
                    clearInterval(intervalID);
                }
                ;
            }, 100)

        } else {

        }
    }

    function minVyr3(gvm) {
        if (gvm == 3) {
            $("#minVyr3").html('max(summ(');
            var intervalID = setInterval(function () {
                if (waitOnCVM2.length && waitOnCVM3.length) {
                    var arrTemp = waitOnCVM2.concat(waitOnCVM3);
                    $.each(arrTemp, function (index, value) {
                        if (value != undefined && value != "") {
                            $("#minVyr3").append(value);
                            if (index != (arrTemp.length - 1))
                                $("#minVyr3").append(" + ");
                        }
                        ;
                    });
                    $("#minVyr3").append("))=" + summArr(arrTemp));
                    clearInterval(intervalID);
                }
                ;
            }, 100)

        } else {

        }
    }

    function minVyr4(gvm) {
        if (gvm == 3) {
            $("#minVyr4").html('max(max{');
            var intervalID = setInterval(function () {
                if (waitOnCVM2.length && waitOnCVM3.length) {
                    var arrTemp = waitOnCVM2.concat();
                    var Nj = nJOperac(waitOnCVM2, waitOnCVM3);
                    $.each(waitOnCVM3, function (index, value) {
                        if (arrTemp[index] != undefined) {
                            arrTemp[index] += value;
                        } else {
                            arrTemp[index] = value;
                        }
                    });
                    $.each(arrTemp, function (index, value) {
                        if (value != undefined && value != "") {
                            $("#minVyr4").append(value / Nj[index]);
                            arrTemp[index] = value / Nj[index];
                            if (index != (arrTemp.length - 1))
                                $("#minVyr4").append(", ");
                        }
                        ;
                    });
                    $("#minVyr4").append("})=" + maxArr(arrTemp));
                    clearInterval(intervalID);
                }
                ;
            }, 100)

        } else {

        }
    }

    function minVyr5(gvm) {
        if (gvm == 3) {
            $("#minVyr5").html('max(max{');
            var intervalID = setInterval(function () {
                if (waitOnCVM2.length && waitOnCVM3.length) {
                    var arrTemp = waitOnCVM2.concat();
                    var Nj = nJOperac(waitOnCVM2, waitOnCVM3);
                    $.each(waitOnCVM3, function (index, value) {
                        if (arrTemp[index] != undefined) {
                            arrTemp[index] += value;
                        } else {
                            arrTemp[index] = value;
                        }
                    });
                    $.each(arrTemp, function (index, value) {
                        if (value != undefined && value != "") {
                            $("#minVyr5").append(value / Nj[index]);
                            arrTemp[index] = value / Nj[index];
                            if (index != (arrTemp.length - 1))
                                $("#minVyr5").append(" + ");
                        }
                        ;
                    });
                    $("#minVyr5").append("})=" + summArr(arrTemp));
                    clearInterval(intervalID);
                }
                ;
            }, 100)

        } else {

        }
    }

    function nJOperac(arrayT1, arrayT2) {
        var arrTemp = Array();

        $.each(waitOnCVM2, function (index, value) {
            if (arrTemp[index] == undefined) {
                arrTemp[index] = 1;
            } else {
                arrTemp[index]++;
            }
        });
        $.each(waitOnCVM3, function (index, value) {
            if (arrTemp[index] == undefined) {
                arrTemp[index] = 1;
            } else {
                arrTemp[index]++;
            }
        });

        return arrTemp;
    }

    function summArr(arrayT) {
        var summ = 0;
        $.each(arrayT, function (index, value) {
            if (value != undefined)
                summ += value;
        });
        return summ
    }

    function maxArr(arrayT) {
        var max = 0;
        $.each(arrayT, function (index, value) {
            max = value > max ? value : max;
        });
        return max
    }

    function minArr(arrayT) {
        var min = 10000;
        $.each(arrayT, function (index, value) {
            min = value < min ? value : min;
        });
        return min
    }

// оптимізація використання обладнання
    function optymiz1(gvm) {
        var t1 = 0,
            t2 = 0,
            t3 = 0,
            t11 = 0,
            t22 = 0,
            t33 = 0;

        if (gvm == 3) {
            $("#optMax1").html('max(min{');
            for (var i = 0; i < countDetail; i++) {
                t1 += tableTime[i][1];
                t2 = Math.max(t1, t2) + tableTime[i][2];
                t3 = Math.max(t1, t2, t3) + tableTime[i][3];

                t11 += tableTime[i][1];
                t22 += tableTime[i][2];
                t33 += tableTime[i][3];
            }
            ;
            $("#optMax1").append(t11 / t1 + ", " + (t22 / t2).toFixed(2) + ", " + (t33 / t3).toFixed(2) + "})=" + (Math.min(t11 / t1, t22 / t2, t33 / t3)).toFixed(2));
        } else {

        }
    }

    function optymiz2(gvm) {
        var t1 = 0,
            t2 = 0,
            t3 = 0,
            t11 = 0,
            t22 = 0,
            t33 = 0;

        if (gvm == 3) {
            $("#optMax2").html('max(summ(');
            for (var i = 0; i < countDetail; i++) {
                t1 += tableTime[i][1];
                t2 = Math.max(t1, t2) + tableTime[i][2];
                t3 = Math.max(t1, t2, t3) + tableTime[i][3];

                t11 += tableTime[i][1];
                t22 += tableTime[i][2];
                t33 += tableTime[i][3];
            }
            ;
            $("#optMax2").append(t11 / t1 + " + " + (t22 / t2).toFixed(2) + " + " + (t33 / t3).toFixed(2) + "))=" + (t11 / t1 + t22 / t2 + t33 / t3).toFixed(2));
        } else {

        }
    }

    function optymiz3(gvm) {
        var t1 = 0,
            t2 = 0,
            t3 = 0,
            t11 = 0,
            t22 = 0,
            t33 = 0;

        if (gvm == 3) {
            $("#optMax3").html('min(max{');
            for (var i = 0; i < countDetail; i++) {
                t1 += tableTime[i][1];
                t2 = Math.max(t1, t2) + tableTime[i][2];
                t3 = Math.max(t1, t2, t3) + tableTime[i][3];

                t11 += tableTime[i][1];
                t22 += tableTime[i][2];
                t33 += tableTime[i][3];
            }
            ;
            t11 = t1 - t11;
            t22 = t2 - t22;
            t33 = t3 - t33;
            $("#optMax3").append(t11 + ", " + t22 + ", " + t33 + "})=" + Math.max(t11, t22, t33));
        } else {

        }
    }

    function optymiz4(gvm) {
        var t1 = 0,
            t2 = 0,
            t3 = 0,
            t11 = 0,
            t22 = 0,
            t33 = 0;

        if (gvm == 3) {
            $("#optMax4").html('min(max{');
            for (var i = 0; i < countDetail; i++) {
                t1 += tableTime[i][1];
                t2 = Math.max(t1, t2) + tableTime[i][2];
                t3 = Math.max(t1, t2, t3) + tableTime[i][3];

                t11 += tableTime[i][1];
                t22 += tableTime[i][2];
                t33 += tableTime[i][3];
            }
            ;
            t11 = t1 - t11;
            t22 = t2 - t22 - tableTime[0][1];
            t33 = t3 - t33 - tableTime[0][1] - tableTime[0][2];
            $("#optMax4").append(t11 + ", " + t22 + ", " + t33 + "})=" + Math.max(t11, t22, t33));
        } else {

        }
    }

    function optymiz5(gvm) {
        var t1 = 0,
            t2 = 0,
            t3 = 0,
            t11 = 0,
            t22 = 0,
            t33 = 0;

        if (gvm == 3) {
            $("#optMax5").html('min(summ(');
            for (var i = 0; i < countDetail; i++) {
                t1 += tableTime[i][1];
                t2 = Math.max(t1, t2) + tableTime[i][2];
                t3 = Math.max(t1, t2, t3) + tableTime[i][3];

                t11 += tableTime[i][1];
                t22 += tableTime[i][2];
                t33 += tableTime[i][3];
            }
            ;
            t11 = t1 - t11;
            t22 = t2 - t22;
            t33 = t3 - t33;
            $("#optMax5").append(t11 + " + " + t22 + " + " + t33 + "))=" + (t11 + t22 + t33));
        } else {

        }
    }

    function optymiz6(gvm) {
        var t1 = 0,
            t2 = 0,
            t3 = 0,
            t11 = 0,
            t22 = 0,
            t33 = 0;

        if (gvm == 3) {
            $("#optMax6").html('min(max{');
            for (var i = 0; i < countDetail; i++) {
                t1 += tableTime[i][1];
                t2 = Math.max(t1, t2) + tableTime[i][2];
                t3 = Math.max(t1, t2, t3) + tableTime[i][3];


                t11 += tableTime[i][1];
                t22 += tableTime[i][2];
                t33 += tableTime[i][3];
            }
            ;
            t11 = t1 - t11;
            var intervalID = setInterval(function () {
                if (stopGVM2 != 0 && stopGVM3 != 0) {
                    t22 = (t2 - t22) / stopGVM2;
                    t33 = (t3 - t33) / stopGVM3;
                    $("#optMax6").append(t11 + ", " + t22.toFixed(2) + ", " + t33.toFixed(2) + "})=" + Math.max(t11, t22, t33).toFixed(2));
                    clearInterval(intervalID);
                }
                ;
            }, 100)
        } else {

        }
    }

    function optymiz7(gvm) {
        var t1 = 0,
            t2 = 0,
            t3 = 0,
            t11 = 0,
            t22 = 0,
            t33 = 0;

        if (gvm == 3) {
            $("#optMax7").html('min(max{');
            for (var i = 0; i < countDetail; i++) {
                t1 += tableTime[i][1];
                t2 = Math.max(t1, t2) + tableTime[i][2];
                t3 = Math.max(t1, t2, t3) + tableTime[i][3];


                t11 += tableTime[i][1];
                t22 += tableTime[i][2];
                t33 += tableTime[i][3];
            }
            ;
            t11 = t1 - t11;
            var intervalID = setInterval(function () {
                if (stopGVM2 != 0 && stopGVM3 != 0) {
                    t22 = (t2 - t22) / stopGVM2;
                    t33 = (t3 - t33) / stopGVM3;
                    $("#optMax7").append(t11 + " + " + t22.toFixed(2) + " + " + t33.toFixed(2) + "})=" + (t11 + t22 + t33).toFixed(2));
                    clearInterval(intervalID);
                }
                ;
            }, 100)
        } else {

        }
    }

// мінімізація виробничого циклу
    function min1(gvm) {
        var t1 = 0,
            t2 = 0,
            t3 = 0;

        if (gvm == 3) {
            $("#min1").html('min(max{');
            for (var i = 0; i < countDetail; i++) {
                t1 += tableTime[i][1];
                t2 = Math.max(t1, t2) + tableTime[i][2];
                t3 = Math.max(t1, t2, t3) + tableTime[i][3];
                $("#min1").append(t1 + ', ' + t2 + ', ' + t3);
                if (i != countDetail - 1)
                    $("#min1").append(', ');
                else
                    $("#min1").append('})=' + t3);
            }
            ;
        } else {

        }
    }

    function min2(gvm) {
        var t1 = 0,
            t2 = 0,
            t3 = 0;

        if (gvm == 3) {
            $("#min2").html('min(max{');
            for (var i = 0; i < countDetail; i++) {
                t1 += tableTime[i][1];
                t2 = Math.max(t1, t2) + tableTime[i][2];
                t3 = Math.max(t1, t2, t3) + tableTime[i][3];
            }
            ;
            $("#min2").append(t1 + ', ' + t2 + ', ' + t3 + '})=' + t3);
        } else {

        }
    }

    function min3(gvm) {
        var t1 = 0,
            t2 = 0,
            t3 = 0;

        if (gvm == 3) {
            $("#min3").html('min(max{');
            for (var i = 0; i < countDetail; i++) {
                t1 += tableTime[i][1];
                t2 = Math.max(t1, t2) + tableTime[i][2];
                t3 = Math.max(t1, t2, t3) + tableTime[i][3];
                $("#min3").append(t1 + ', ' + t2 + ', ' + t3);
                if (i != countDetail - 1)
                    $("#min3").append(', ');
                else
                    $("#min3").append('})=' + t3);
            }
            ;
        } else {

        }
    }

// Підрахунок загального часу обробки
    function timeZagal(gvm) {
        var t1 = 0,
            t2 = 0,
            t3 = 0;

        if (gvm == 3) {
            for (var i = 0; i < countDetail; i++) {
                t1 += tableTime[i][1];
                t2 = Math.max(t1, t2) + tableTime[i][2];
                t3 = Math.max(t1, t2, t3) + tableTime[i][3];
            }
            ;
            $("#timeZagal").html(t3);
        } else {

        }
    }

// Фунція сортування деталей в правильному порядку
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
        $(nameTable).append('<thead>');
        for (var i = 0; i < m; i++) {
            htmlTemp = "<th>ГВМ " + (i + 1) + "</th>";
            $(nameTable).find('thead').append(htmlTemp);
        }
        ;


        for (var i = 0; i < n; i++) {
            htmlTemp = "<tr class=change" + (i + 1) + ">"
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

        for (var k = 0; k < countDetail; k++) {
            for (var i = 0; i < tableTime[k][1]; i++) {
                tbody.find('.gwm-1').append('<td class="det-' + (k + 1) + '">' + tableTime[k][0] + '</td>');
            }
            pos1[k] = tableTime[k][1];
            if (countEquip > 2) {
                poz2[k] = tableTime[k][2];
            }
        }
        eq1Prostoy.push(tableTime[0][1]);
        eq2Prostoy.push(tableTime[0][1]);
        poz2.unshift((tableTime[0][1]));
        pos.push(tableTime[0][1]);
        if (countEquip > 2) {
            pos2.push(tableTime[0][2]); //позицыя 2 гвм
            pos2_2.push((tableTime[0][2]) + (tableTime[0][3]) + (tableTime[0][1])); //позицыя 3 гвм
        }
        /*for first GWM*/

        /*for else GWM*/
        for (var k = 0; k < countDetail; k++) {
            for (var j = 1; j < countEquip; j++) {
                if (j == 1) {
                    var prev_poz = 0;
                    for (var i = 0; i <= k; i++) {
                        prev_poz += pos1[i];
                    }
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
                }
                if (j == 2) {
                    var prev_poz = 0;
                    for (var i = 0; i <= k + 1; i++) {
                        prev_poz += poz2[i];
                    }
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
                    if (k != 0) {
                        pos2_2[pos2_2.length - 1] = pos2_2[pos2_2.length - 1] + tableTime[k][j + 1];
                    }

                }
            }
            eq1Prostoy = [];
            eq2Prostoy = [];
        }
        /*for else GWM*/

        // К-сть одиниць простою
        stopGVM2 = 0;
        stopGVM3 = 0;
        waitOnCVM2 = Array();
        waitOnCVM3 = Array();
        var temp = 0
        $(".gantDiagram .gwm-2 td").each(function (index, value) {
            var nextTd = 0;
            if (value.innerHTML == "" && $(".gantDiagram .gwm-2 td:nth-child(" + index + ")").html() != "")
                stopGVM2++;
            if (value.innerHTML == "") {
                temp++;
                nextTd = $(".gantDiagram .gwm-2 td:nth-child(" + (index + 2) + ")").html();
                if (nextTd != "") {
                    if (nextTd != "1")
                        waitOnCVM2[nextTd] = temp;
                    temp = 0;
                }
                ;
            }
        });
        temp = 0;
        $(".gantDiagram .gwm-3 td").each(function (index, value) {
            var nextTd = 0;
            if (value.innerHTML == "" && $(".gantDiagram .gwm-3 td:nth-child(" + index + ")").html() != "")
                stopGVM3++;
            if (value.innerHTML == "") {
                temp++;
                nextTd = $(".gantDiagram .gwm-3 td:nth-child(" + (index + 2) + ")").html();
                if (nextTd != "") {
                    if (nextTd != "1")
                        waitOnCVM3[nextTd] = temp;
                    temp = 0;
                }
                ;
            }
        });
    }

    /*--------- Gant digram end---------*/
});