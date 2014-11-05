
 var random_data_store;
        var real_data_store;
        var headline_element;
        var headline_hed;
        var headline_dek
        var random_rows_length;
        var real_rows_length;
        var create_headline_form;
        var share_buttons_container;

        var init_headline_generator = function() {
            random_rows_length = random_data_store.length;
            real_rows_length = real_data_store.length;
            headline_element = jQuery('#generated_headline');
            headline_hed = jQuery('<h1></h1>');
            headline_element.append(headline_hed);
            headline_dek = jQuery('<p></p>');
            headline_element.append(headline_dek);
            create_headline_form = jQuery('<form action="#generated_headline"></form>');
            create_headline_form.append(jQuery('<label for="generate_headline_button"></label>'));
            create_headline_form.append(jQuery('<input type="submit" value="Hit Me"></input>'));
            create_headline_form.bind('submit', function() {
                display_new_headline();
                return false;
            });
            share_buttons_container = jQuery('<div id="share_buttons_container"></div>');

            var headline_form_container = jQuery('<div class="headline_form_container"></div>');
            headline_form_container.append(create_headline_form);
            headline_element.after(headline_form_container);
            headline_form_container.after(share_buttons_container);
            jQuery('#headline_generator_container').bind('mouseover', function() {
                jQuery(document).bind('keydown', keydown_handler);
            });
            jQuery('#headline_generator_container').bind('mouseout', function() {
                jQuery(document).unbind('keydown', keydown_handler);
            });
        };

        var keydown_handler = function(e) {
            if (e.keyCode === 37) {
                display_new_headline();
            } else if (e.keyCode === 39) {
                display_new_headline();
            } else if (e.keyCode === 32) {
                display_new_headline();
            } else if (e.keyCode === 13) {
                display_new_headline();
            }
            return false;
        }

        var display_new_headline = function() {
            var hed_and_url = construct_new_headline() 
            set_twitter_text(hed_and_url[0], hed_and_url[1]);
            set_facebook_text(hed_and_url[0], hed_and_url[1]);
        }

        var construct_new_headline = function() {
            var hed;
            if ( Math.random() * 5 > 4 ) {
                hed_and_url = new_real_headline()
            } else {
                hed_and_url = new_random_headline()
            }
            return [hed_and_url[0], hed_and_url[1]];
        }

        var new_real_headline = function() {
            var hed_num = get_real_row_number();
            var hed = '<a href="' + real_data_store[hed_num].url + '" target="_blank">'
                    + real_data_store[hed_num].hed
                + '</a>';
	        headline_hed.html(hed);
            return [real_data_store[hed_num].hed, real_data_store[hed_num].url];
        }

        var new_random_headline = function() {
            var noun_num = get_random_row_number();
            var noun = random_data_store[noun_num].noun;
            var is_ing = random_data_store[noun_num].takesing.toLowerCase() === 'yes';
            var verb = random_data_store[get_random_row_number()].verb;
            if (is_ing) {
                verb = verb.replace(/e$/, '');
            }
            var second_noun = random_data_store[get_random_row_number()].secondnoun;
            var hed = noun + ' ' + verb + (is_ing ? 'ing ' : ' ') + second_noun + '?';
            headline_hed.html(hed);
			return [hed, 'http://mojo.ly/Yx9rZM'];
        }

      set_twitter_text = function(hed, url) {
            jQuery('#headline_generator_container .hed-twitter-share-button').remove()
            share_buttons_container.append('<a class="hed-twitter-share-button" target="blank" href="https://twitter.com/intent/tweet?original_referer=&source=tweetbutton&text='
                + encodeURI(hed)
                + (url === 'http://mojo.ly/Yx9rZM' ? '+%23FAKEMOJO':'')
                + ' ' + url
                + '&via=MotherJones'
				+'">TWEET</a>'
            );
        } 

        var set_facebook_text = function(hed, url) {
            jQuery('#headline_generator_facebook_like').remove();
            share_buttons_container.append(
                jQuery('<a id="headline_generator_facebook_like" target="_blank" '
                    + 'href="https://www.facebook.com/dialog/feed?app_id='
                    + '119572928091379'
                    + '&link=' + encodeURI(url)
                    + '&picture=' + encodeURI('http://assets.motherjones.com/interactives/projects/2012/11/sadpanda.jpg')
                    + '&name=' + encodeURI(hed)
                    + '&caption=' + encodeURI('From The Mother Jones Eco-Doom Headline Generator. Go make your own!')
                    + '&redirect_uri=' + encodeURI(document.location)
                    + '">FACEBOOK</a>'
                )
            /*    jQuery(
                    '<a id="headline_generator_facebook_like" target="_blank" '
                        + 'href="https://www.facebook.com/sharer/sharer.php?u='
                        + encodeURI(document.location)
                        + '&t='
                        + hed
                    + '" >facebook</a>'
                )
            */
            );
        }

        var get_random_row_number = function() {
            return Math.floor(Math.random() * random_rows_length)
        }

        var get_real_row_number = function() {
            return Math.floor(Math.random() * real_rows_length)
        }

        Tabletop.init({ 
            key: "0AswaDV9q95oZdHpOX2s2MmpsNXR1RXRqNDEtS0FiV1E",
            proxy : 'https://s3.amazonaws.com/mj-tabletop-proxy',
            wanted: ['fake', 'real'],
            callback: function(data) {
                random_data_store = data.fake.elements;
                real_data_store = data.real.elements;
                init_headline_generator();
                display_new_headline();
            }
        });
