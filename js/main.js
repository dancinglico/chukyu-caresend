//---ハンバーガーメニュー
$(".hamburger").on("click", function () {
    $('.sp-navi').slideToggle(); // Toggles the SP menu
    $(".menu-icon").toggleClass("active");
});

$(".sp-navi li a").on("click", function (event) {
    event.preventDefault();
    $('.sp-navi').slideToggle();

    var target = $(this).attr("href"); // クリックされたリンクのhref属性を取得
    var targetPosition = $(target).offset().top; // 該当セクションの位置を取得
    var headerHeight = $('header').outerHeight();

    $("html, body").animate({
        scrollTop: targetPosition- headerHeight
    }, 1000); 
});

$(".header-navi li a").on("click", function (event) {
    event.preventDefault();

    var target = $(this).attr("href"); // クリックされたリンクのhref属性を取得
    var targetPosition = $(target).offset().top; // 該当セクションの位置を取得
    var headerHeight = $('header').outerHeight();

    $("html, body").animate({
        scrollTop: targetPosition- headerHeight
    }, 1000); 
});

$(".cta-button a").on("click", function (event) {
    event.preventDefault();

    var target = $(this).attr("href"); // クリックされたリンクのhref属性を取得
    var targetPosition = $(target).offset().top; // 該当セクションの位置を取得
    var headerHeight = $('header').outerHeight();

    $("html, body").animate({
        scrollTop: targetPosition- headerHeight
    }, 1000); 
});



//---form---------

const formIds = ["#form1", "#form2"];

formIds.forEach(function (formId) {

    $(`${formId} input`).on("focus input", function () {
        $(this).addClass("active-input"); // 🔥 フォーカスした時点で色を変える

        if ($(this).val().length === 0) {
            $(this).removeClass("active-input"); // 空欄なら元に戻す
        }
    });

    $(`${formId} input`).on("blur", function () {
        if ($(this).val().length === 0) {
            $(this).removeClass("active-input"); // フォーカスを外した時、空欄なら元に戻す
        }
    });

    //--電話番号の入力アシスト
    $(`${formId} input[name="phone"]`).on("input", function () {
        let value = $(this).val().replace(/\D/g, "");
        if (value.length >= 11) {
            value = value.slice(0, 11);
        }
        if (value.length > 3 && value.length <= 7) {
            value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
        } else if (value.length > 7) {
            value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
        }
        $(this).val(value);
    });


    const $submitBtn = $(`${formId} .submit-btn`);

    $(`${formId} input`).on('change', function () {


        //フィールド空白チェック
        if (
            $(`${formId} input[type="text"]`).val() !== "" &&
            $(`${formId} input[type="tel"]`).val() !== "" &&
            $(`${formId} input[type="email"]`).val() !== ""
        ) {
            $submitBtn.prop('disabled', false); //disabled外す


        } else {
            $submitBtn.prop('disabled', true);

        }
    });

});


//ありがとうございました
$(".submit-btn").on("click", function (event) {
    event.preventDefault(); // フォーム送信を防ぐ
    $(".form-thanks").show(); // すべての .form-thanks を表示
});



//-----Swiper-----------------
//-----企業-----------------
const swiper = new Swiper('.swiper-company', {
    slidesPerView: 2,
    speed: 4000,
    spaceBetween: 63,
    loop: true,
    autoplay: {
        delay: 0,
    },
    breakpoints: {
        768: {
            slidesPerView: 5,
            spaceBetween: 80,
        }
    }
});

//-----Swiper-----------------
//-----導入事例-----------------

const exampleSwiper = new Swiper('.swiper-example', {

    speed: 400,
    loop: true,
    slidesPerView: 1,

    navigation: {
        nextEl: '.example-button-next',
        prevEl: '.example-button-prev',
    },

    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 54,
        }
    }
});


//--FAQ------
$(".faq-q").click(function () {
    const faqBox = $(this).closest('.faq-box'); // クリックされた要素の親の `.faq-box`
    const faqAnswer = faqBox.find('.faq-a'); // `.faq-box` 内の `.faq-a`

    // `.faq-box` に `active` クラスをトグル
    faqBox.toggleClass('active');

    // `.faq-a` をスライドトグル
    faqAnswer.slideToggle();

    // 他の開いている要素を隠す（アコーディオン動作）
    $(".faq-box").not(faqBox).removeClass('active').find('.faq-a').slideUp();
});


//--------スクロールされたら表示-------

//要素が画面内にあるかチェック
function isElementVisible(element) {

    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    const elementTop = $(element).offset().top;

    return scroll + windowHeight > elementTop;
}

//画面内に要素が入ったらアニメーション
function ShowOnScroll(elementClass, activeClass) {

    $(window).on("scroll", function () {　//windowスクロール時

        $(elementClass).each(function () {

            // 既にactiveの要素は変更しない
            if ($(this).hasClass(activeClass)) {
                return;
            }

            //画面内に要素が入ったらactiveクラスを付与
            if (isElementVisible(this)) {
                $(this).addClass(activeClass);
            }
        });
    });
}

ShowOnScroll(".fadein", "is-active"); //下から上にフェードイン
ShowOnScroll(".fadein-left", "is-active"); //左から右にフェードイン
ShowOnScroll(".fadein-right", "is-active"); //右から左にフェードイン
