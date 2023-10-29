const generateRecordRanking = generateNavBGOverlay.then(() => {
    return new Promise((resolve, reject) => {
        const pageYear = checkYearParam();

        fetch(`/data/${pageYear}/record-setting.json`)
            .then(response => response.json())
            .then(recordSetting => {
                fetch(`/data/${pageYear}/record.json`)
                .then(response => response.json())
                .then(recordJSON => {
                    recordSetting.courseList.forEach(courseRule => {
                        const courseID = courseRule.id;

                        // paramで指定されたコースか
                        if (courseID == getParam("c")) {
                            const courseRobotList = generateRobotListWithPoint(recordSetting, recordJSON, courseID);
                            const h2CourseNameElement = document.getElementById("h2-course-name");
                            h2CourseNameElement.innerText = courseRule.name;

                            const recordRankingSelectMenuElement = document.getElementById("record-ranking-select-menu");
                            const recordRankingTablesElement = document.getElementById("record-ranking-tables");

                            function generateTableElement(robotList, scoreRuleID, orderFactor) {
                                let sortKey = [orderFactor, "sumPoint", "contestTime", "!id"];
                                if (orderFactor == "sumPoint") sortKey = ["sumPoint", "contestTime", "!id"];
                                const sortedCourseRobotListOrdered = sortRobotList(recordSetting, courseRobotList, scoreRuleID, sortKey);
                                
                                const recordRankingTableElement = document.createElement("table");
                                recordRankingTableElement.id = scoreRuleID;
                                recordRankingTableElement.innerHTML = `
                                    <thead>
                                        <tr>
                                            <th class = "order" order = "order"><a>走順</a></th>
                                            <th class = "id" order = "!id"><a>番号</a></th>
                                            <th class = "name" order = "name"><a>ロボット名</a></th>
                                            <th class = "team" order = "team"><a>チーム名</a></th>
                                            <th class = "belonging" order = "belonging"><a>所属</a></th>
                                            <th class = "sumPoint" order = "sumPoint"><a>得点</a></th>
                                            <th class = "contestPoint" order = "contestPoint"><a>競技点</a></th>
                                            <th class = "judgePoint" order = "judgePoint"><a>審査点</a></th>
                                            <th class = "contestTime" order = "contestTime"><a>競技時間</a></th>
                                            <th class = "remark" order = "remark"><a>備考</a></th>
                                        </tr>
                                    </thead>
                                `;
                                tdLinkElementsArray = Array.from(recordRankingTableElement.getElementsByTagName("a"));
                                tdLinkElementsArray.forEach(linkElement => {
                                    linkElement.setAttribute("href", "#");
                                });
                                recordRankingTableBodyElement = document.createElement("tbody");
                                
                                sortedCourseRobotListOrdered.forEach(robot => {
                                    const rowElement = document.createElement("tr");
                                    rowElement.innerHTML = `
                                        <td class = "order" order = "order">${robot.order}</td>
                                        <td class = "id" order = "!id">${robot.id}</td>
                                        <td class = "name" order = "name"><a>${robot.name}</a></td>
                                        <td class = "team" order = "team">${robot.team}</td>
                                        <td class = "belonging" order = "belonging">${robot.belonging}</td>
                                        <td class = "sumPoint" order = "sumPoint">${robot.result[scoreRuleID].sumPoint}</td>
                                        <td class = "contestPoint" order = "contestPoint">${robot.result[scoreRuleID].contestPoint}</td>
                                        <td class = "judgePoint" order = "judgePoint">${robot.result[scoreRuleID].judgePoint}</td>
                                        <td class = "contestTime" order = "contestTime">${robot.result[scoreRuleID].contestTime}</td>
                                        <td class = "remark" order = "remark">${robot.remark ? robot.remark != undefined : ""}</td>
                                    `;
                                    tdLinkElementsArray = Array.from(rowElement.getElementsByTagName("a"));
                                    tdLinkElementsArray.forEach(linkElement => {
                                        linkElement.setAttribute("href", `/record/detail/?y=${pageYear}&r=${robot.id}`);
                                    });
                                    recordRankingTableBodyElement.appendChild(rowElement);
                                });
                    
                                const theadElement = recordRankingTableElement.getElementsByTagName("thead")[0];
                                const thAnchorListArray = Array.from(theadElement.getElementsByTagName("a"));
                                
                                thAnchorListArray.forEach(anchor => {
                                    anchor.addEventListener("click", function(e) {
                                        e.preventDefault();
                                        const targetOrderFactor = anchor.parentElement.getAttribute("order");
                                        const recordRankingTableBodyElementCurrent = document.getElementById(scoreRuleID);
                                        recordRankingTableBodyElementCurrent.remove();
                                        generateTableElement(robotList, scoreRuleID, targetOrderFactor);
                                        document.getElementById(scoreRuleID).classList.add("active");
                                    });
                                });

                                recordRankingTableElement.appendChild(recordRankingTableBodyElement);
                                
                                Array.from(recordRankingTableElement.getElementsByClassName(orderFactor)).forEach(targetElement => {
                                    targetElement.classList.add("order-applied");
                                });
                                
                                if (robotList[0].result[scoreRuleID].order == undefined) {
                                    Array.from(recordRankingTableElement.getElementsByClassName("order")).forEach(orderElement => orderElement.style.display = "none");
                                }
                                if (robotList[0].result[scoreRuleID].judgePoint == undefined) {
                                    Array.from(recordRankingTableElement.getElementsByClassName("contest-point")).forEach(contestPointElement => contestPointElement.style.display = "none");
                                    Array.from(recordRankingTableElement.getElementsByClassName("judge-point")).forEach(judgePointElement => judgePointElement.style.display = "none");
                                }
                                if (robotList[0].result[scoreRuleID].contestTime == undefined) {
                                    Array.from(recordRankingTableElement.getElementsByClassName("contest-time")).forEach(contestTimeElement => contestTimeElement.style.display = "none");
                                }
                                recordRankingTablesElement.append(recordRankingTableElement);
                            }

                            recordSetting.scoreList.forEach(scoreRule => {
                                const recordRankingBtn = document.createElement("li");
                                recordRankingBtn.setAttribute("target-score", scoreRule.id);
                                if (scoreRule.id == recordSetting.scoreList[0].id) recordRankingBtn.classList.add("active");
                                const recordRankingBtnA = document.createElement("a");
                                recordRankingBtnA.setAttribute("href", "#");
                                recordRankingBtnA.innerText = scoreRule.name;
                                recordRankingBtn.appendChild(recordRankingBtnA);
                                recordRankingSelectMenuElement.appendChild(recordRankingBtn);
                                generateTableElement(courseRobotList, scoreRule.id, "sumPoint");
                            });
                            document.getElementById(recordSetting.scoreList[0].id).classList.add("active");
                        }
                    });
                })
                .then(() => {
                    resolve();
                })
                .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    });
});

const addToggleContestEvent = generateRecordRanking.then(() => {
    return new Promise((resolve, reject) => {
        const recordRankingSelectMenuElement = document.getElementById("record-ranking-select-menu");
        const recordRankingSelectMenuButtonElementArray = Array.from(recordRankingSelectMenuElement.getElementsByTagName("li"));
        recordRankingSelectMenuButtonElementArray.forEach(button => {
            button.addEventListener("click", function(e) {
                e.preventDefault();

                const targetScoreID = button.getAttribute("target-score");
                const rankingTablesElement = document.getElementById("record-ranking-tables");
                const targetRankingTableElement = document.getElementById(targetScoreID);
                const activeRankingTableElement = rankingTablesElement.getElementsByClassName("active")[0];

                if (!targetRankingTableElement.classList.contains("active")) {
                    activeRankingTableElement.classList.remove("active");
                    targetRankingTableElement.classList.add("active");
                    recordRankingSelectMenuButtonElementArray.forEach(buttonBuff => {   
                        buttonBuff.classList.remove("active");
                    });
                    button.classList.add("active");
                }
            });
        });
    });
});