let easyIssues = [];
let requestsProccessed = 0;

function createGHButton(url, dateCreated, issueNumber, issueName) {
    let date = formatDate(new Date(dateCreated));
    let button = document.createElement("div");
    let repo = url.split("/");
    if (repo[4] === "Terasology") {
        button.className = "github-button repo-tera";
    } else if (repo[3] === "MovingBlocks") {
        button.className = "github-button repo-other";
    } else {
        button.className = "github-button repo-module";
    }
    let issueNr = document.createElement("a");
    issueNr.className = "gh-number";
    issueNr.href = url;
    issueNr.text = "#" + issueNumber;
    button.appendChild(issueNr);
    let issueTitle = document.createElement("a");
    issueTitle.className = "gh-title";
    issueTitle.href = url;
    issueTitle.text = issueName;
    button.appendChild(issueTitle);
    let issueData = document.createElement("span");
    issueData.className = "gh-meta";
    let repoLink = document.createElement("a");
    repoLink.className = "gh-repo";
    repoLink.href = repo.slice(0, 5).join("/");
    console.log(repo);
    repoLink.text = repo.slice(3, 5).join("/");
    issueData.appendChild(repoLink);
    let clock = document.createElement("i");
    clock.className = "clock tiny material-icons";
    clock.innerText = "access_time";
    issueData.appendChild(clock);
    let issueDate = document.createElement("span");
    issueDate.innerText = date;
    issueDate.className = "gh-clock";
    issueData.appendChild(issueDate);
    button.appendChild(issueData);
    return button;
}

function initEasyIssueScraping() {
    let request1 = new XMLHttpRequest();
    let onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let parse = JSON.parse(this.responseText);
            console.log(parse["items"]);
            parse["items"].forEach(function (item) {
                easyIssues.push(item)
            });
            console.log(this.responseText);
            console.log(easyIssues);
            requestsProccessed++;
            if (requestsProccessed === 1) {
                let parentDiv = document.getElementById("issueSearchResults");
                parentDiv.innerHTML = "";
                easyIssues.forEach(function (value) {
                    let button = createGHButton(value.html_url, value.created_at, value.number, value.title);
                    parentDiv.appendChild(button)
                })
            }
        }
    };
    request1.onreadystatechange = onreadystatechange;
    request1.open("GET", "https://api.github.com/search/issues?q=org:MovingBlocks+label:\"Good First Issue\"+state:open&per_page=100");
    request1.send();
}

function formatDate(d) {
    const m_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const curr_date = d.getDate();
    const curr_month = d.getMonth();
    const curr_year = d.getFullYear();
    return m_names[curr_month] + " " + curr_date + ", " + curr_year;
}