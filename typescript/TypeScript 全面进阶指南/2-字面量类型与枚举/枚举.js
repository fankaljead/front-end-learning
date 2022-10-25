var PageUrl;
(function (PageUrl) {
    PageUrl["Home_Page_Url"] = "url1";
    PageUrl["Setting_Page_Url"] = "url2";
    PageUrl["Share_Page_Url"] = "url3";
})(PageUrl || (PageUrl = {}));
var home = PageUrl.Home_Page_Url;
var Items;
(function (Items) {
    Items[Items["Foo"] = 0] = "Foo";
    Items[Items["Bar"] = 1] = "Bar";
    Items[Items["Baz"] = 2] = "Baz";
})(Items || (Items = {}));
var Items2;
(function (Items2) {
    Items2[Items2["Foo"] = 0] = "Foo";
    Items2[Items2["Bar"] = 300] = "Bar";
    Items2[Items2["Baz"] = 301] = "Baz";
})(Items2 || (Items2 = {}));
var returnNum = function () { return 100 + 299; };
var Items3;
(function (Items3) {
    Items3[Items3["Foo"] = returnNum()] = "Foo";
    Items3[Items3["Bar"] = 299] = "Bar";
    Items3[Items3["Baz"] = 300] = "Baz";
})(Items3 || (Items3 = {}));
var Mixed;
(function (Mixed) {
    Mixed[Mixed["Num"] = 600] = "Num";
    Mixed["Str"] = "zxh";
})(Mixed || (Mixed = {}));
var Itemm;
(function (Itemm) {
    Itemm[Itemm["Foo"] = 0] = "Foo";
    Itemm[Itemm["Bar"] = 1] = "Bar";
    Itemm[Itemm["Baz"] = 2] = "Baz";
})(Itemm || (Itemm = {}));
var fooValue = Itemm.Foo;
var fooKey = Itemm[0];
