//var baseURL = "http://ukhub02:8080";
//var baseURL = "http://g1cg1d:8080";
var baseURL = "http://localhost:8080";
var viewpointAssetBasePath = "/viewpoint-services/v1.0/assets";
var viewpointSearchURL = baseURL + viewpointAssetBasePath;
var incIndent = "&indent=true";
var solrWriter = "&wt=json"
var solrFieldList = "&fl=name,index_id";
var solrParams = incIndent + solrWriter + solrFieldList
var solrSearchField = "collector:"
var range = "?from=0&to=10";

function getAsset(assetID) {
    $.ajax({
        type: "GET",
        url: viewpointSearchURL + "/" + assetID,
        //context: document.body,
        crossDomain: true,
        dataType: "text",
        //async: false,
        //jsonp: 'json.wrf'
    })
        .done(function (data) {
            //$('#asset').html(JSON.stringify(data, undefined, 2));
            $('#asset').removeClass("alert-danger");
            $('#asset').html(data).addClass("alert alert-success").show();
            //$('#asset').addClass("jumbotron").show();
        })
    .error(function (msg) {
        $('#asset').removeClass("alert-success");
        $('#asset').html(msg.responseText).addClass("alert alert-danger").show();
        //alert(msg.responseText)
    })
}

function myFunctionSearch() {
    var query = $('#q3').val();
    $.ajax({
        type: "GET",
        url: viewpointSearchURL + "/search/"
            //+ solrSearchField
            + query + range,
        //+ solrParams,
        crossDomain: true,
        dataType: "text",
        //jsonp : "json.wrf",
        //async: true,
        beforeSend: function () {
            $('#assetsList').empty();
            $('#asset').hide();
        }
    })
        .done(function (data) {
            $('#P1').removeClass("alert-danger");
            $('#P1').text("Here's the response: ").addClass("alert-success");

            var searchResults = JSON.parse(data);

            $.each(searchResults.data.assets, function (i, asset) {
                $('#assetsList').append('<li><a href="#" id="' + asset.id + '" class="list-group-item">' + asset.name + '</a></li>');
            });
            $(".list-group-item").click(function (event) {
                getAsset(event.target.id);
            });
        })
        .error(function (data) {
            $('#P1').removeClass("alert-success");
            $('#P1').text("ERROR").addClass("alert-danger");

            $('#asset').text(data.responseText).addClass("alert alert-danger").show();
        })
}




//function myFunctionSearchUsegetJSON() {
//    var query = $('#q2').val();
//    $.getJSON(viewpointSearchURL + "/search/" + query + "json.wrf=?", function (data) {
//        alert(data.name);
//    });

//}

function onKeyUpCalled(e) {
    var enterKey = 13;
    if (e.keyCode == enterKey) {
        e.preventDefault();
        myFunctionSearch();
    }
    return false;
}

function init() {
    alert("onload");
    alert($('#engSelected').text());
}

//onload = init();

$(window).load(function () {
    $('#engSelected').click(function (e) {
        viewpointAssetBasePath = "/viewpoint-services/v1.0/en_EN/assets";
        viewpointSearchURL = baseURL + viewpointAssetBasePath;
    });

    $('#turSelected').click(function (e) {
        viewpointAssetBasePath = "/viewpoint-services/v1.0/tr_TR/assets";
        viewpointSearchURL = baseURL + viewpointAssetBasePath;
    });

    $('#A1').click(function (e) {
        range = "?from=0&to=10"
    });
    $('#A2').click(function (e) {
        range = "?from=0&to=20"
    });
    $('#A3').click(function (e) {
        range = "?from=0&to=30"
    });
    $('#A4').click(function (e) {
        range = "?from=0&to=40"
    });
    $('#A5').click(function (e) {
        range = "?from=0&to=50"
    });

});