
window.onload = function(){
    // if (document.body.requestFullscreen) {
    //     document.body.requestFullscreen();
    // }
    // console.log(document.body);
    let e = document.getElementById("game");

    e.onclick = function() {

        if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
            RunPrefixMethod(document, "CancelFullScreen");
        }
        else {
            RunPrefixMethod(e, "RequestFullScreen");
        }

    }
};

let pfx = ["webkit", "moz", "ms", "o", ""];
function RunPrefixMethod(obj, method) {

    let p = 0, m, t;
    while (p < pfx.length && !obj[m]) {
        m = method;
        if (pfx[p] === "") {
            m = m.substr(0,1).toLowerCase() + m.substr(1);
        }
        m = pfx[p] + m;
        t = typeof obj[m];
        if (t !== "undefined") {
            pfx = [pfx[p]];
            return (t === "function" ? obj[m]() : obj[m]);
        }
        p++;
    }

}