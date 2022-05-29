console.log("kal tak present news");
// 13599a53da464f8b8c052831f12fe529
let apikey = '13599a53da464f8b8c052831f12fe529';
let news = document.getElementById("news");
const xhr = new XMLHttpRequest();
xhr.open('GET',`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`,true);
// xhr.getResponseHeader('content-type', 'application/json');
xhr.onload=function() {
    if (this.status===200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        // console.log(articles);
        let sharehtml="";
        articles.forEach(function(element,index){
            // console.log(articles[news]);
            let share = `<p>
                                <a
                                class="btn btn-primary"
                                data-bs-toggle="collapse"
                                href="#collapseExample${index}"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                                >
                                ${element["title"]}
                                </a>

                            </p>
                            <div class="collapse" id="collapseExample${index}">
                            <div class="card card-body">
                                ${element["description"]}
                                <a class="btn btn-link btn-sm " href="${element["url"]}"target="_blank">Read more</a>
                                
                            </div>
                            </div>
                            <hr>`;
            sharehtml+=share;
        });
        news.innerHTML=sharehtml;
    }
    else
    {
        console.log("Some error occurred");
    }
}
xhr.send();
