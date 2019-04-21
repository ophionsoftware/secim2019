function secim2019() {
    var sonuclar = 0;
    function getSum(array) {
        var total = 0;
        for (let index = 0; index < array.length; index++) {
            const element = parseFloat(array[index].voteCount);
            total += element;
        }
        return total;
    }
    String.prototype.turkishToLower = function(){
        var string = this;
        var letters = { "İ":"i","I": "i", "Ş": "s", "Ğ": "g", "Ü": "u", "Ö": "o", "Ç": "c", "ı": "i", "ş": "s", "ğ": "g", "ü": "u", "ö":"o", "ç": "c" };
        string = string.replace(/(([İIŞĞÜÇÖışğüöç]))/g, function(letter){ return letters[letter]; })
        return string.toLowerCase();
    }
    function bubbleSort(arr){
        var len = arr.length;
        for (var i = len-1; i>=0; i--){
            for(var j = 1; j<=i; j++){
                if(parseFloat(arr[j-1].voteCount)<parseFloat(arr[j].voteCount)){
                    var temp = arr[j-1];
                    arr[j-1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }
    var requestURL = 'js/secim.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        sonuclar = request.response;
        sonuclar.forEach(element => {
            sonuclar.results = bubbleSort(element.results);
            element.results.totalVote = getSum(element.results);
            sonuclar.results = element.results;
        });
        console.log(sonuclar);
        kazanan();
        
    }
    function kazanan(){
        sonuclar.forEach(element => {
            if (element.results[0].name=="CHP") {
                $('#'+element.name.turkishToLower()+' path').css("fill", "#ff0000");
            }
            if (element.results[0].name=="AK Parti") {
                $('#'+element.name.turkishToLower()+' path').css("fill", "#fda50f");
            }
            if (element.results[0].name=="MHP") {
                $('#'+element.name.turkishToLower()+' path').css("fill", "#256d7b");
            }
            if (element.results[0].name=="HDP") {
                $('#'+element.name.turkishToLower()+' path').css("fill", "#30106b");
            }
        });
    }
    $('#kazanan').click(function(){
        $('#kazanan').hide();
        $('#fark').show();
        kazanan();
    });
    $('#fark').click(function(){
        $('#fark').hide();
        $('#kazanan').show();
        sonuclar.forEach(element => {
            var different = element.results[0].voteCount-element.results[1].voteCount;
            if (element.results[0].name=="CHP") {
                if(different>0 && different<=10000){
                $('#'+element.name.turkishToLower()+' path').css("fill", "#ff6666");
                }
                if(different>10000 && different<=50000){
                    $('#'+element.name.turkishToLower()+' path').css("fill", "#ff3232");
                }
                if(different>50000 && different<=100000){
                    $('#'+element.name.turkishToLower()+' path').css("fill", "#ff0000");
                }
                if(different>100000){
                    $('#'+element.name.turkishToLower()+' path').css("fill", "#b20000");
                }
            }
            if (element.results[0].name=="AK Parti") {
                if(different>0 && different<=10000){
                $('#'+element.name.turkishToLower()+' path').css("fill", "#fdc96f");
                }
                if(different>10000 && different<=50000){
                    $('#'+element.name.turkishToLower()+' path').css("fill", "#fdae26");
                }
                if(different>50000 && different<=100000){
                    $('#'+element.name.turkishToLower()+' path').css("fill", "#fda50f");
                }
                if(different>100000){
                    $('#'+element.name.turkishToLower()+' path').css("fill", "#ca840c");
                }
            }
            if (element.results[0].name=="MHP") {
                if(different>0 && different<=10000){
                $('#'+element.name.turkishToLower()+' path').css("fill", "#7ca7af");
                }
                if(different>10000 && different<=50000){
                    $('#'+element.name.turkishToLower()+' path').css("fill", "#3a7b88");
                }
                if(different>50000 && different<=100000){
                    $('#'+element.name.turkishToLower()+' path').css("fill", "#256d7b");
                }
                if(different>100000){
                    $('#'+element.name.turkishToLower()+' path').css("fill", "#1d5762");
                }
            }
            if (element.results[0].name=="HDP") {
                if(different>0 && different<=10000){
                $('#'+element.name.turkishToLower()+' path').css("fill", "#826fa6");
                }
                if(different>10000 && different<=50000){
                    $('#'+element.name.turkishToLower()+' path').css("fill", "#442779");
                }
                if(different>50000 && different<=100000){
                    $('#'+element.name.turkishToLower()+' path').css("fill", "#30106b");
                }
                if(different>100000){
                    $('#'+element.name.turkishToLower()+' path').css("fill", "#260c55");
                }
            }
        });
    });
    const element = document.querySelector('#svg-turkiye-haritasi');
    const info = document.querySelector('.il-isimleri');

    element.addEventListener(
        'mouseover',
        function (event) {
        var myhtml = "";
        var iladi = event.target.parentNode.getAttribute('data-iladi');
        var plakano = event.target.parentNode.getAttribute('data-plakakodu');
        const sonuc = sonuclar[(plakano-1)];
        if(sonuc.isMetropolitan){
            iladi += " Büyükşehir Belediyesi"
        }
        else{
            iladi += " Belediyesi"
        }
        for (let i = 0; i < 3; i++) {
            //myhtml+="\n<p>"+sonuc.results[i].name+":%"+((sonuc.results[i].voteCount*100)/sonuc.results.totalVote).toFixed(2)+" - "+sonuc.results[i].voteCount+"</p>\n";
            myhtml+="<tr>"+
                    "<td>"+sonuc.results[i].name+"</td>"+
                    "<td>%"+((sonuc.results[i].voteCount*100)/sonuc.results.totalVote).toFixed(2)+"</td>"+
                    "<td>"+sonuc.results[i].voteCount+"</td>"+
                "</tr>";
        }
        if (event.target.tagName === 'path' && event.target.parentNode.id !== 'guney-kibris') {
            info.innerHTML = [
            '<div>',
                iladi,
            '<hr>',
                "<table>",
                    "<tr>",
                        "<th>Parti Adı</th>",
                        "<th>Oy Oranı</th>",
                        "<th>Oy Sayısı</th>",
                    "</tr>",
                    myhtml,
            '</div>'
            ].join('');
        }
        }
    );
}