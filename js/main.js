$(function () {
    var m = {
        ts: null,
        st: ['', '흑', '백'],
        bs: false,
        ba: false,
        ai: null,

        hf: document.getElementById("frame"),
        hl: document.querySelector("#log textarea"),
        hs: document.querySelectorAll("#board > div"),
        hd: document.getElementById("dropout"),

        o: new omok(20, 5),

        Initialize: function (nf) {
            var t = this;
            t.o.nt = t.ba ? 1 : nf + 1;
            t.o.nf = nf + 1;
            t.ts = new Date();
            t.o.Initialize(t.o.ab);
            t.hf.className = "";

            for (i = 0; i < t.hs.length; ++i) {
                t.hs[i].className = "";
            }

            t = null;
        },

        Start: function (nf) {
            var t = this;
            t.bs = true;
            t.Initialize(nf);
            t.hf.className = t.o.ct[t.o.nt];
            t.hd.value = "기 권";
            t.hl.innerHTML = "＞ 시작할게요!\n";

            if (nf === 1) {
                t.hl.innerHTML += "＞ 선공은 AI에요.\n";
                this.Pass({ x: 7, y: 7 }, 0);
            } else {
                t.hl.innerHTML += "＞ 선공은 당신이에요.\n";
            }

            t = null;
        },

        Dropout: function (s) {
            var t = this;
            t.hl.innerHTML += ("\n＞ " + t.st[t.o.nt] + s);
            t.o.nt ^= 3;
            t.hf.className = t.o.ct[t.o.nt];
            t.Over();
            t = null;
        },

        Over: function () {
            var t = this;
            var tm = new Date();
            var te = new Date(tm - t.ts);

            t.bs = false;
            t.hf.classList.add("win");
            t.hd.value = "다 시";
            t.hl.innerHTML +=
                "\n＞ 시작 " + t.ts.getHours() + ":" + t.ts.getMinutes() + ":" + t.ts.getSeconds() +
                "\n＞ 종료 " + tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + "\n＞ " + t.o.nm + "수 만에 ";

            if (t.ba) {
                var $hi = document.getElementById("name");
                var $hs = document.querySelectorAll("#record span");
                var v = (t.o.nf == t.o.nt) ? 1 : 0;
                var e = (te.getMinutes() * 100) + te.getSeconds();
                var l = Number($hs[0].getAttribute("data-total")) + 1;

                t.hl.innerHTML += (v == 1 ? $hi.value : "AI") + "의 승리에요!\n";

                $.post("08/01.php", { id: $hi.value, ret: v, color: t.o.nf, nm: t.o.nm, elapse: e });
                $hs[0].setAttribute("data-total", l);
                $hs[0].innerHTML = l + "전 ";

                if (v == 1) {
                    l = Number($hs[2].getAttribute("data-lose")) + 1;
                    $hs[2].setAttribute("data-lose", l);
                    $hs[2].innerHTML = l + "패";
                } else {
                    l = Number($hs[1].getAttribute("data-win")) + 1;
                    $hs[1].setAttribute("data-win", l);
                    $hs[1].innerHTML = l + "승 ";
                }

                $hi = $hs = l = v = e = null;
            } else {
                t.hl.innerHTML += t.st[t.o.nt] + "의 " + "승리에요!\n";
            }

            te = tm = t = null;
        },

        Put: function (ph) {
            var t = this;
            var ni = ph.index();
            var xy = t.o.I2XY(ni);

            if (t.ba && (t.o.nm == 0) && (ni != 112)) {
                t.hl.innerHTML += "＞ 흑돌은 가운데에 둬야해요.\n";
                return;
            }

            if (t.o.ab[xy.y][xy.x] == 0) {
                var na = Check(t.o.ab, t.o.nm, t.o.nl, t.ba ? 1 : t.o.nf, t.o.nt, xy, true, true, false);

                if ((na < -1000)) {
                    var r = (na == -1001) ? "33" : (na == -1002) ? "44" : "6목";
                    t.hl.innerHTML += "＞ " + r + "금수에요.\n";
                    r = null;
                    return;
                }

                if (t.Pass(xy, na) && t.ba) {
                    function Thread(t) {
                        setTimeout(function () {
                            var p = AI(t.o.Tree());
                            p = t.o.I2XY(p);
                            var nd = Check(t.o.ab, t.o.nm, t.o.nl, 1, t.o.nt, p, true, true, false);
                            t.Pass(p, nd);
                            t = p = nd = null;
                        }, 100);
                    }

                    Thread(this);
                }
            }

            ni = xy = t = null;
        },

        Pass: function (xy, v) {
            var t = this;
            var i = t.o.XY2I(xy);
            var r = false;

            ++t.o.nm;
            t.hs[i].className = t.o.ct[t.o.nt];
            t.o.ab[xy.y][xy.x] = t.o.nt;

            if (v >= 1111) {
                t.o.Win(xy, t.hs, (v % 10 - 1), 2);
                t.Over();
            } else {
                t.o.nt ^= 3;
                t.o.au.push(i);
                t.hf.className = t.o.ct[t.o.nt];

                for (var j = 0; j < t.hs.length; ++j) {
                    t.hs[j].classList.remove("last");
                }

                t.hs[i].classList.add("last");
                r = true;
            }

            t = i = xy = v = null;
            return r;
        },

        Undo: function () {
            var t = this;

            if (!t.ba) {
                if (!t.o.Undo(t.hs)) {
                    t.hl.innerHTML += "＞ 무를 돌이 없어요.\n";
                } else {
                    t.hf.className = t.o.ct[t.o.nt];
                }
            } else {
                t.hl.innerHTML += "＞ 컴퓨터랑은 무르기가 안돼요.\n";
            }

            t = null;
        }
    };

    var $hu = document.getElementById("undo");
    var $hd = document.getElementById("dropout");
    var $he = document.getElementById("exit");

    $("#board > div").click(function () {
        if (m.bs) {
            m.Put($(this));
        }
    });

    $(".turn").click(function () {
        m.o.nl = 15;
        m.ba = true;

        document.getElementById("start").classList.add("hide");
        m.Start($(this).index(".turn"));
        $h = null;
    });

    $hu.onclick = function () {
        if (m.bs) {
            m.Undo();
        }
    };

    $hd.onclick = function () {
        if (m.bs) {
            m.Dropout("이 기권했어요.\n");
        } else {
            document.getElementById("name").value = "";
            document.getElementById("mode").className = "";
            document.getElementsByTagName("body")[0].className = "center";
            m.Initialize(0);
        }
    };

    $he.onclick = function () {
        window.opener = self;
        window.open("", "_parent", "");
        window.close();
    };

    $hu = $hd = $he = null;
});