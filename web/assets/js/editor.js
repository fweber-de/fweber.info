$(document).ready(function () {

    $('.editor-top-back').click(function () {
        window.location.href = $(this).data('url');
    });

    //ace
    var editor = ace.edit("ace-editor");
    editor.setTheme("ace/theme/github");
    editor.getSession().setMode("ace/mode/markdown");
    editor.getSession().setTabSize(4);
    document.getElementById('ace-editor').style.fontSize = '16px';

    //position cells
    var positionCells = function () {
        var windowWidth = window.innerWidth;
        var topHeight = $('.editor-top-bar').height();
        var windowHeight = window.innerHeight;
        var titleFieldHeight = $('#input-title').height();

        $('.editor-body').css('height', windowHeight - topHeight - 1);
        $('#ace-editor').css('height', windowHeight - topHeight - titleFieldHeight - 12);
        $('.editor-preview').css('height', windowHeight - topHeight - 1);
    };

    positionCells();

    //save
    $('#btn-save').click(function () {
        var title = $('#input-title').val();
        var text = editor.getValue();

        if (title === '' || text === '') {
            swal('Attention!', 'Title and Text must not be empty!', 'warning');
        } else {

            var url = ($(this).data('action') === 'add')
                ? Routing.generate('backend_posts_create')
                : Routing.generate('backend_posts_update', {postId: $(this).data('id')});

            $.post(url, {
                sent: 1,
                ajax: 1,
                title: title,
                text: text
            }, function (data) {
                if (data.status === 'error') {
                    swal('Error!', data.message, 'error');
                } else {
                    swal({
                        title: 'Success!',
                        text: data.message,
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonColor: "#5cb85c",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    }, function () {
                        window.location.href = Routing.generate('backend_posts_collection');
                    });
                }
            });
        }
    });

    //markdown
    var md = new Remarkable('commonmark');
    $('#input-title').keyup(function () {
        $('#editor-preview-title').html('<h1>' + $(this).val() + '</h1>')
    });
    editor.getSession().on('change', function (e) {
        $('#editor-preview-text').html(md.render(editor.getValue()));
    });

    //resize
    $(window).resize(function () {
        positionCells();
        editor.resize();
    });

    //tags modal
    $('#btn-tags').click(function() {
        $('#modal-tags').modal('show');
    });

    //prefill on start
    $('#editor-preview-title').html('<h1>' + $('#input-title').val() + '</h1>')
    $('#editor-preview-text').html(md.render(editor.getValue()));

});