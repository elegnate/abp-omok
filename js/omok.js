function omok(nl, nd) {
    var t = this;
    t.nl = nl;
    t.nd = nd;
    t.nm = 0;
    t.nt = 1;
    t.nf = 0;
    t.ct = ['', 'b', 'w'];
    t.nu = null;
    t.ab = new Array(nl);
    t.au = [];

    for (var i = 0; i < nl; ++i) {
        t.ab[i] = new Array(nl);

        for (var j = 0; j < nl; ++j) {
            t.ab[i][j] = 0;
        }
    }

    t = nl = nd = null;
}


omok.prototype.I2XY = function (ni) {
    return {
        y: Math.floor(ni / this.nl),
        x: ni % this.nl
    };
}


omok.prototype.XY2I = function (xy) {
    return xy.x + (xy.y * this.nl);
}


omok.prototype.Initialize = function (ab) {
    this.au = [];
    this.nu = [0, 0, 0];
    this.nm = 0;

    for (var i = 0; i < this.nl; ++i) {
        for (var j = 0; j < this.nl; ++j) {
            ab[i][j] = 0;
        }
    }
}


omok.prototype.Tree = function () {
    var rt = new node();
    var t = this;
    var b = false;

    Expand(t.ab, t.nm, t.nl, rt, t.nt, t.nt, 1, 1, 0, 0, false);

    for (var i = 0; i < rt.child.length; ++i) {
        if (rt.child[i].v >= 60) {
            b = true;
        } else if (rt.child[i].v < 7) {
            rt.child.splice(i--, 1);
        }
    }

    if (!b) {
        if (rt.child.length > 2) {
            for (var i = 0; i < rt.child.length; ++i) {
                var p = t.I2XY(rt.child[i].i);
                rt.child[i].child = [];
                t.ab[p.y][p.x] = t.nt;
                Expand(t.ab, t.nm + 1, t.nl, rt.child[i], t.nt, t.nt ^ 3, 2, t.nd, rt.child[i].v, rt.child[i].a, false);
                t.ab[p.y][p.x] = 0;
                delete rt.child[i].v;
                delete rt.child[i].a;
            }
        } else {
            rt = new node();
            Expand(t.ab, t.nm, t.nl, rt, t.nt, t.nt, 1, t.nd, 0, 0, true);
        }
    }

    t = null;
    return rt;
}


omok.prototype.Win = function (xy, $hs, f) {
    var t = this;
    var vx = 0, vy = 0;
    var tp = xy;

    switch (f) {
        case 0: vx = -1; break;
        case 1: vy = -1; break;
        case 2: vx = -1; vy = -1; break;
        case 3: vx = 1; vy = -1; break;
    }

    $hs[t.XY2I(tp)].classList.add("win");

    for (var i = 0; i < 2; ++i) {
        for (var j = 0; j < 4; ++j) {
            tp = {
                x: tp.x + vx,
                y: tp.y + vy
            };

            if ((tp.x < 0) || (tp.x >= t.nl) ||
                (tp.y < 0) || (tp.y >= t.nl) ||
                t.ab[tp.y][tp.x] == (t.nt ^ 3)) {
                break;
            } else if (t.ab[tp.y][tp.x] == t.nt) {
                $hs[t.XY2I(tp)].classList.add("win");
            }
        }

        tp = xy;
        vx = -vx;
        vy = -vy;
    }

    vx = vy = t = f = tp = null;
}


omok.prototype.Undo = function ($hs) {
    var t = this;

    if (t.au.length > 0) {
        var n = t.au.pop();
        var xy = t.I2XY(n);
        t.ab[xy.y][xy.x] = 0;
        $hs[n].className = "";
        t.nt ^= 3;
        ++t.nu[t.nt];
        --t.nm;
        return true;
    }

    return false;
}