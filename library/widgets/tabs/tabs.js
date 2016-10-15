'use strict';

(function($){
	$.fn.accessibleTabs = function(){
		function setActiveTab(button, focusContent){
			var tab = $(button).closest('.tab'),
				content = $('> .content', tab),
				tabsHolder = $(button).closest('.tabs');

			$('> .tab > button', tabsHolder).attr('aria-selected', false);
			button.attr('aria-selected', true);

			$('> .tab', tabsHolder).removeClass('active');
			tab.addClass('active');

			$('> .tab > .content', tabsHolder).attr(
				{
					'aria-expanded': false,
					'aria-hidden': true,
					'tabindex': '-1'
				}
			);
			content.attr(
				{
					'aria-expanded': true,
					'aria-hidden': false
				}
			);

			if(focusContent){
				content.focus();
			}
		}

		$(document).off('click.tab').on('click.tab', '.tab > button', function(e){
			setActiveTab($(this), true);
			e.preventDefault();
		});

		$(this).each(function(){
			var tabs = $('> .tab', this);
			if(tabs.length && tabs.filter('.active').length === 0){
				setActiveTab(tabs.eq(0).find('> button, > a').eq(0));
			}
		});
	};

	$('.tabs').accessibleTabs();

	$(document).off('reinitWidgets.tabs').on('reinitWidgets.tabs', function(){
		$('.tabs').accessibleTabs();
	});	
})(jQuery);