$(function(){
    var sub = ''
    var score = 0
    var title = ''
    function checkURL(url){
        return(url.match(/\.(jpeg|jpg|gif|png)$/) == null);
    }
    function sendReq(){
        $("#title").html("")
        $("#start").prop("disabled",true);
        console.log("");
        var asdf = Math.floor(Math.random()*4)
        if(asdf == 0){
            sub = 'aww'
        }
        if(asdf == 1){
            sub = 'funny'
        }
        if(asdf == 2){
            sub = 'mildlyinteresting'
        }
        if(asdf == 3){
            sub = 'pics'
        }
        console.log(sub);
        $('#guess').attr("src","spinner.gif");
        $.ajax({
            type: "GET",
            data:{
            restrict_sr: "true"
            },
            url: "http://www.reddit.com/r/" + sub + "/top.json?limit=100",
            success: function(response) {
                console.log(response);
                var children = response.data.children;
                var rng = Math.floor(Math.random()*100)
                while(checkURL(children[rng].data.url)||children[rng].data.url.includes("gfycat.com") || checkURL(children[rng].data.url)||children[rng].data.url.includes("i.imgur.com")){
                    rng = Math.floor(Math.random()*100)
                    console.log(children[rng].data.url)
                }
                console.log(children[rng].data.url)
                title = children[rng].data.title
                $('#guess').attr("src",children[rng].data.url);
        },
    });
    }
    
    window.onload=function(){
        sendReq();
    }
    $('.guessbutton').on('click', function(){
        console.log("hi")
        if($(this).text().toLowerCase() == sub){
            score += 5;
            $('#scorebox').html("Score: " + score)
            sendReq()
        }
        else{
            $("#finalscore").text(score)
            $("#correct").text(sub)
            score = 0
            $('#scorebox').html("Score: " + score)
            $("#gameover").modal("show")
        }
    })
    $("#continue").on("click", function(){
        sendReq()
    })
    $("#showtitle").on("click", function(){
        $("#title").html(title)
        score = score - 5
        $('#scorebox').html("Score: " + score)
    })
})