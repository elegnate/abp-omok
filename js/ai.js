function AI(s) {
    var r = [];

    Max(-Infinity, Infinity, s);
    //Log(s, 3, 1);

    for (var i = 0; i < s.child.length; ++i) {
        if (s.v == s.child[i].v) {
            r.push(s.child[i].i);
        }
    }

    s = null;
    return r[Math.floor(Math.random() * 100) % r.length];
}


function node(i, s, a) {
    if (typeof s === "number") {
        this.v = s;
    } else {
        this.child = [];
    }

    if (typeof i === "number") {
        this.i = i;
    }

    if (typeof a === "number") {
        this.a = a;
    }
}


function Expand(ab, nm, nl, nd, ct, nt, dp, md, v, ak, b) {
    var ap = new Array(nl * nl);
    var l = nl * nl;

    for (var i = 0; i < l; ++i) {
        ap[i] = 0;
    }

    for (var i = 0; i < nl; ++i) {
        for (var j = 0; j < nl; ++j) {
            if (ab[i][j] === 0) {
                continue;
            }

            for (var k = -1; k < 2; ++k) {
                for (var l = -1; l < 2; ++l) {
                    var n = i + k;
                    var m = j + l;
                    var c = m + n * nl;

                    if ((n < 0) || (n >= nl) || (m < 0) || (m >= nl) ||
                        (ab[n][m] !== 0) || (ap[c] !== 0)) {
                        continue;
                    }

                    var a = Check(ab, nm, nl, 1, nt, { x: m, y: n }, true, false, b);
                    var d = Check(ab, nm, nl, 1, nt ^ 3, { x: m, y: n }, false, false, b);
                    var p = (a > d) ? a + Math.floor(d / 10) : d + Math.floor(a / 10);

                    if (p === 0 && nm > 2) {
                        continue;
                    }

                    p = (ct === nt) ? p : -p;

                    if ((md > dp) && (a !== 90)) {
                        var td = md;

                        if ((ak >= 30 && ak !== 50) && (d === 80)) {
                            td + 1;
                            p = v + (ct !== nt) ? -a : a;
                        } else if ((ct === nt) || (ak < 30 || ak === 50)) {
                            p += v;
                        } else {
                            continue;
                        }

                        ab[n][m] = nt;
                        nd.child.push(new node((dp === 1) ? c : null));
                        Expand(ab, nm + 1, nl, nd.child[nd.child.length - 1], ct, nt ^ 3, dp + 1, td, p, a, false);
                        ab[n][m] = 0;
                        td = null;
                    } else {
                        if (dp === 1) {
                            nd.child.push(new node(c, v + p, a));
                        } else {
                            nd.child.push(new node(null, v + p));
                        }
                    }

                    ap[c] = 1;
                    n = m = a = d = c = p = null;
                }
            }
        }
    }

    ap = l = dp = v = t = md = nt = null;
}


function Max(a, b, n) {
    if ((typeof n.v !== "undefined")) {
        return n.v;
    }

    var v = -Infinity;

    for (var i = 0; i < n.child.length; i++) {
        var c = n.child[i];

        v = Math.max(v, Min(a, b, c));

        if (v > b) {
            return n.v = v;
        }

        if (v > a) {
            a = v;
        }
    }

    return n.v = v;
}


function Min(a, b, n) {
    if ((typeof n.v !== "undefined")) {
        return n.v;
    }

    var v = Infinity;

    for (var i = 0; i < n.child.length; i++) {
        var c = n.child[i];

        v = Math.min(v, Max(a, b, c));

        if (v < a) {
            return n.v = v;
        }

        if (v < b) {
            b = v;
        }
    }

    return n.v = v;
}


function Log(n, m, d) {
    if (typeof n.child === 'undefined') {
        console.log(n.v);
    } else if (m >= d) {
        console.groupCollapsed(n.v + " " + n.i % 15 + ":" + Math.floor(n.i / 15));

        for (var i = 0; i < n.child.length; i++) {
            Log(n.child[i], m, d + 1);
        }

        console.groupEnd();
    }
}