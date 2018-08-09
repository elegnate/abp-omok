function Is5(a, nf, nt) {
    for (var i = 0; i < 4; ++i) {
        var n = a[i] % 40000;

        if ((n == 33) || (n == 113) || (n == 223) || (n == 1111) || (n == 2222) || (n == 1131) || (n == 2232) ||
            (n == 313) || (n == 323) || (n == 1311) || (n == 2322) || (n == 3111) || (n == 3222) ||
            (n == 1331) || (n == 2332) || (n == 3311) || (n == 3322) || (n == 3331) || (n == 3332)) {
            return i + 1;
        }

        if (((n == 1113) || (n == 133) || (n == 233) || (n == 2223) ||
            (n == 2233) || (n == 333) || (n == 1133) ||
            (n == 2333) || (n == 1333) || (n == 3333))) {
            return (nf != nt) ? i + 1 : 1000;
        }
    }

    return 0;
}


function Is44(a) {
    for (var i = 0; i < 3; ++i) {
        for (var j = i + 1; j < 4; ++j) {
            var n = a[i] % 40000;
            var m = a[j] % 40000;

            if (((Isn4s(n) || Isn4w(n)) && (a[i] < 80000)) &&
                ((Isn4s(m) || Isn4w(m)) && (a[j] < 80000))) {
                return true;
            }
        }
    }

    return false;
}


function Is43f(a) {
    for (var i = 0; i < 3; ++i) {
        for (var j = i + 1; j < 4; ++j) {
            if (((a[i] == 1110 || a[i] == 2220) && Isn3(a[j])) ||
                ((a[j] == 1110 || a[j] == 2220) && Isn3(a[i]))) {
                return true;
            }
        }
    }

    return false;
}


function Is43(a) {
    for (var i = 0; i < 3; ++i) {
        for (var j = i + 1; j < 4; ++j) {
            var n = a[i] % 40000;
            var m = a[j] % 40000;

            if ((((Isn4s(n) || Isn4w(n)) && (a[i] < 80000)) && Isn3(a[j])) ||
                (((Isn4s(m) || Isn4w(m)) && (a[j] < 80000)) && Isn3(a[i]))) {
                return true;
            }
        }
    }

    return false;
}


function Is42(a) {
    for (var i = 0; i < 4; ++i) {
        for (var j = i + 1; j < 4; ++j) {
            var n = a[i] % 40000;
            var m = a[j] % 40000;

            if ((((Isn4s(n) || Isn4w(n)) && (a[i] < 80000)) && Isn2(a[j])) ||
                (((Isn4s(m) || Isn4w(m)) && (a[j] < 80000)) && Isn2(a[i]))) {
                return true;
            }
        }
    }

    return false;
}


function Is4sa(a) {
    for (var i = 0; i < 4; ++i) {
        if (Isn4s(a[i])) {
            return true;
        }
    }

    return false;
}


function Is4wd(a) {
    for (var i = 0; i < 4; ++i) {
        if ((a[i] == 1011) || (a[i] == 1101)) {
            return true;
        }
    }

    return false;
}


function Is4wa(a) {
    for (var i = 0; i < 4; ++i) {
        if (Isn4w(a[i])) {
            return true;
        }
    }

    return false;
}


function Isn4s(a) {
    return (a == 13) || (a == 23) || (a == 222) || (a == 111);
}


function Isn4w(a) {
    return (a == 221) || (a == 112) || (a == 1110) || (a == 1011) ||
        (a == 1101) || (a == 31) || (a == 2220) || (a == 103) || (a == 203) ||
        (a == 2022) || (a == 2202) || (a == 32);
}


function Is4b(a) {
    for (var i = 0; i < 4; ++i) {
        var n = a[i] % 40000;

        if (Isn4s(n) && (a[i] < 80000)) {
            return true;
        }
    }

    return false;
}


function Is33(a) {
    for (var i = 0; i < 3; ++i) {
        for (var j = i + 1; j < 4; ++j) {
            if (Isn3(a[i]) && Isn3(a[j])) {
                return true;
            }
        }
    }

    return false;
}


function Is32(a) {
    for (var i = 0; i < 3; ++i) {
        for (var j = i + 1; j < 4; ++j) {
            if ((Isn3(a[i]) && Isn2(a[j])) ||
                (Isn3(a[j]) && Isn2(a[i]))) {
                return true;
            }
        }
    }

    return false;
}


function Isn3(a) {
    return (a == 3) || (a == 11) || (a == 22) || (a == 12) || (a == 21) ||
        (a == 101) || (a == 202) || (a == 110) || (a == 220);
}


function Is3(a) {
    for (var i = 0; i < 4; ++i) {
        if ((a[i] == 3) || (a[i] == 11) || (a[i] == 22)) {
            return true;
        }
    }

    return false;
}


function Is3f(a) {
    for (var i = 0; i < 4; ++i) {
        if (Isn3(a[i])) {
            return true;
        }
    }

    return false;
}


function Is22(a) {
    return (Isn2(a[0]) && Isn2(a[2])) || (Isn2(a[1]) && Isn2(a[3]));
}


function Is222(a) {
    return (Isn2(a[0]) && Isn2(a[2]) && (Isn2(a[1]) && Isn2(a[3]))) ||
        (Isn2(a[1]) && Isn2(a[3]) && (Isn2(a[0]) && Isn2(a[2])));
}


function Is2(a) {
    for (var i = 0; i < 4; ++i) {
        if (Isn2(a[i])) {
            return true;
        }
    }

    return false;
}


function Isn2(a) {
    return (a == 1) || (a == 2) || (a == 10) || (a == 20);
}


function Check(ab, nm, nl, nf, nt, xy, b, f, z) {
    var a = new Array(4);
    var r = 0;

    a[0] = Enum(ab, nl, nt, xy, -1, 0);
    a[1] = Enum(ab, nl, nt, xy, 0, -1);
    a[2] = Enum(ab, nl, nt, xy, -1, -1);
    a[3] = Enum(ab, nl, nt, xy, 1, -1);

    if ((r = Is5(a, nf, nt)) > 0) {
        r = (r == 1000) ? -1003 : (f ? 1110 + r : b ? 90 : 80);
    } else if (Is44(a)) {
        r = (nf == nt) ? -1002 : 70;
    } else if (Is43f(a)) {
        r = b ? 65 : 50;
    } else if (Is43(a)) {
        r = b ? 65 : 55;
    } else if (Is4sa(a)) {
        r = b ? 60 : 50;
    } else if (b && Is4wa(a)) {
        r = 32;
    } else if (Is33(a)) {
        r = (nf == nt) ? -1001 : 50;
    } else if (b && Is32(a)) {
        r = 21;
    } else if (Is3(a) || Is4b(a)) {
        r = b ? 10 : 1;
    } else if (b && Is3f(a)) {
        r = 7;
    } else if (b && (z || 20 > nm) && Is222(a)) {
        r = 20;
    } else if (b && (z || 15 > nm) && Is22(a)) {
        r = 5;
    } else if (b && (z || 10 > nm) && Is2(a)) {
        r = 2;
    }

    b = a = f = xy = nl = nf = nt = null;
    return r;
}


function Enum(ab, nl, nt, xy, vx, vy) {
    var v = 0;
    var tp = xy;

    for (var i = 1; i <= 2; ++i) {
        for (var j = 1; j < 10000; j *= 10) {
            tp = {
                x: tp.x + vx,
                y: tp.y + vy
            };

            if ((tp.x < 0) || (tp.x >= nl) ||
                (tp.y < 0) || (tp.y >= nl) ||
                ab[tp.y][tp.x] == (nt ^ 3)) {
                v += ((ab[tp.y - vy][tp.x - vx] == 0) ? ((j == 1) ? 40000 : 0) : 40000);
                break;
            } else if (ab[tp.y][tp.x] == nt) {
                v += (i * j);
            }
        }

        tp = xy;
        vx = -vx;
        vy = -vy;
    }

    nl = nt = xy = vx = vy = tp = null;
    return v;
}