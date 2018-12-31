$(document).ready(function() {
    $.getJSON("/api/events").then(addEvents);
    $(".create-form").keypress(function(a) {
        if (13 == a.which) createEvent();
    });
    $(".list").on("click", ".delete", function(a) {
        a.stopPropagation();
        removeEvent($(this).parent());
    });
});

function clicked() {
    createEvent();
}

function addEvents(a) {
    a.forEach(function(a) {
        addEvent(a);
    });
}

function addEvent(a) {
    var b = $('<div class="col-xl-3 col-md-6 col-xs-12 event-text"><h4 class="event-title">' + a.title + '</h4><span class="event-date">' + a.date + '</span></br><span class="event-location">' + a.location + '</span></br><img class="event-image img-fluid" src="' + a.image + '"><button class="delete btn btn-warning">Delete</button></div>');
    b.data("id", a._id);
    $(".list").append(b);
}

function createEvent() {
    var a = $("#newTitleInput").val();
    var b = $("#newDateInput").val();
    var c = $("#newLocationInput").val();
    var d = get_link;
    $.post("/api/events", {
        title: a,
        date: b,
        location: c,
        image: d
    }).then(function(a) {
        $("#newTitleInput").val("");
        $("#newDateInput").val("");
        $("#newLocationInput").val("");
        get_link = "";
        $(".none").removeClass("none").addClass("dropzone");
        $(".status").addClass("none");
        addEvent(a);
    }).catch(function(a) {
        console.log(a);
    });
}

function removeEvent(a) {
    var b = a.data("id");
    var c = "/api/events/" + b;
    $.ajax({
        method: "DELETE",
        url: c
    }).then(function(b) {
        a.remove();
    }).catch(function(a) {
        console.log(a);
    });
}

!function(a, b) {
    "use strict";
    if ("function" === typeof define && define.amd) define([], b); else if ("object" === typeof exports) module.exports = b(); else a.Imgur = b();
}(this, function() {
    "use strict";
    var a = function(b) {
        if (!this || !(this instanceof a)) return new a(b);
        if (!b) b = {};
        if (!b.clientid) throw "Provide a valid Client Id here: https://api.imgur.com/";
        this.clientid = b.clientid;
        this.endpoint = "https://api.imgur.com/3/image";
        this.callback = b.callback || void 0;
        this.dropzone = document.querySelectorAll(".dropzone");
        this.info = document.querySelectorAll(".info");
        this.run();
    };
    a.prototype = {
        createEls: function(a, b, c) {
            var d = document.createElement(a), e;
            for (e in b) if (b.hasOwnProperty(e)) d[e] = b[e];
            if (c) d.appendChild(document.createTextNode(c));
            return d;
        },
        insertAfter: function(a, b) {
            a.parentNode.insertBefore(b, a.nextSibling);
        },
        post: function(a, b, c) {
            var d = new XMLHttpRequest();
            d.open("POST", a, true);
            d.setRequestHeader("Authorization", "Client-ID " + this.clientid);
            d.onreadystatechange = function() {
                if (4 === this.readyState) if (this.status >= 200 && this.status < 300) {
                    var a = "";
                    try {
                        a = JSON.parse(this.responseText);
                    } catch (b) {
                        a = this.responseText;
                    }
                    c.call(window, a);
                } else throw new Error(this.status + " - " + this.statusText);
            };
            d.send(b);
            d = null;
        },
        createDragZone: function() {
            var a, b, c;
            a = this.createEls("p", {}, "Drop Event Image File Here");
            b = this.createEls("p", {}, "Or click here to select image");
            c = this.createEls("input", {
                type: "file",
                className: "input",
                accept: "image/*"
            });
            Array.prototype.forEach.call(this.info, function(c) {
                c.appendChild(a);
                c.appendChild(b);
            }.bind(this));
            Array.prototype.forEach.call(this.dropzone, function(a) {
                a.appendChild(c);
                this.status(a);
                this.upload(a);
            }.bind(this));
        },
        loading: function() {
            var a, b, c;
            a = this.createEls("div", {
                className: "loading-modal"
            });
            b = this.createEls("table", {
                className: "loading-table"
            });
            c = this.createEls("img", {
                className: "loading-image",
                src: "./css/loading-spin.svg"
            });
            a.appendChild(b);
            b.appendChild(c);
            document.body.appendChild(a);
        },
        status: function(a) {
            var b = this.createEls("div", {
                className: "status"
            });
            this.insertAfter(a, b);
        },
        matchFiles: function(a, b) {
            var c = b.nextSibling;
            if (a.type.match(/image/) && "image/svg+xml" !== a.type) {
                document.body.classList.add("loading");
                c.classList.remove("bg-success", "bg-danger");
                c.innerHTML = "";
                var d = new FormData();
                d.append("image", a);
                this.post(this.endpoint, d, function(a) {
                    document.body.classList.remove("loading");
                    "function" === typeof this.callback && this.callback.call(this, a);
                }.bind(this));
            } else {
                c.classList.remove("bg-success");
                c.classList.add("bg-danger");
                c.innerHTML = "Invalid archive";
            }
        },
        upload: function(a) {
            var b = [ "dragenter", "dragleave", "dragover", "drop" ], c, d, e, f;
            a.addEventListener("change", function(b) {
                if (b.target && "INPUT" === b.target.nodeName && "file" === b.target.type) {
                    d = b.target.files;
                    for (e = 0, f = d.length; e < f; e += 1) {
                        c = d[e];
                        this.matchFiles(c, a);
                    }
                }
            }.bind(this), false);
            b.map(function(b) {
                a.addEventListener(b, function(a) {
                    if (a.target && "INPUT" === a.target.nodeName && "file" === a.target.type) if ("dragleave" === b || "drop" === b) a.target.parentNode.classList.remove("dropzone-dragging"); else a.target.parentNode.classList.add("dropzone-dragging");
                }, false);
            });
        },
        run: function() {
            var a = document.querySelector(".loading-modal");
            if (!a) this.loading();
            this.createDragZone();
        }
    };
    return a;
});

var get_link = "";

var feedback = function(a) {
    if (true === a.success) {
        get_link = a.data.link.replace(/^http:\/\//i, "https://");
        document.querySelector(".status").classList.add("bg-success");
        document.querySelector(".status").innerHTML = '<img class="img" alt="Imgur-Upload" src="' + get_link + '"/>';
        document.querySelector(".dropzone").setAttribute("class", "none");
        $(".status").removeClass("none");
    }
};

new Imgur({
    clientid: "615f41747fbdf6f",
    callback: feedback
});

///////////////////////////////////SUBMIT BUTTON/////////////////////////

$(function() {
    var a = $("#browserAlert");
    a.hide();
    $.ajax({
        url: "https://cdn.rawgit.com/arasatasaygin/is.js/master/is.min.js",
        dataType: "script",
        success: function() {
            if (is.edge() || is.ie()) {
                a.find("span").text("View on Chrome/Firefox.");
                a.show();
                a.addClass("active");
            }
        }
    });
    var b = $("button.btnSubmit");
    var c = $("svg.loader");
    var d = $("svg.checkmark");
    b.on("click", function() {
        if ($(this).hasClass("clicked")) return;
        $(this).addClass("clicked");
        var a = $(this);
        var b = 600, e = 2500, f = 3e3;
        setTimeout(function() {
            a.append(c.clone());
            a.find("svg").removeClass("svg--template");
            a.find("svg").css("display", "initial");
        }, b);
        setTimeout(function() {
            a.text("");
            a.find("svg").remove();
            a.append(d.clone());
            a.find("svg").css("display", "initial");
            a.find("svg").removeClass("svg--template");
            a.addClass("done");
        }, b + e);
        setTimeout(function() {
            a.find("svg").remove();
            a.text("Submit");
            a.removeClass("clicked");
            a.removeClass("done");
        }, b + e + f);
    });
});
