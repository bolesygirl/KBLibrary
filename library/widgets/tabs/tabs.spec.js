'use strict';

describe('Tabs component', function () {
	var basicTabMarkup = '<div class="tab"><button></button><div class="content"></div></div>',
		markupNoTabs = '<div class="tabs"></div>',
		markupWithOneTab = '<div class="tabs">'+basicTabMarkup+'</div>',
		markupWithTwoTabs = '<div class="tabs">'+basicTabMarkup+basicTabMarkup+'</div>',
		markupWithSecondTabActive = '<div class="tabs">'+basicTabMarkup+'<div class="tab active"><button></button><div class="content"></div></div>'+basicTabMarkup+'</div>',
		fullTabMarkup = '<div class="tabs"><div class="tab"><button id="tabTrigger1"></button><div class="content" id="tabContent1"></div></div><div class="tab"><button id="tabTrigger2"></button><div class="content" id="tabContent2"></div></div></div>';
	
	$('body').append('<div id="tabsHolder"></div>');

	it('If it contains no tabs it should not trigger any JS errors', function() {
		$('#tabsHolder').html(markupNoTabs);
		$(document).trigger('reinitWidgets');
		expect($('.tabs').length).toBe(1);
		expect($('.tab.active').length).toBe(0);
	});

	it('If it contains one tab that does not have the class active applied it should automatically make it active', function() {
		$('#tabsHolder').html(markupWithOneTab);
		$(document).trigger('reinitWidgets');

		expect($('.tabs').length).toBe(1);
		expect($('.tabs').eq(0).find('.tab').eq(0).is('.active')).toBe(true);
	});

	it('If it contains two tabs and neither of them already has the class active applied it should automatically make the first one active', function() {
		$('#tabsHolder').html(markupWithTwoTabs);
		$(document).trigger('reinitWidgets');

		expect($('.tabs').length).toBe(1);

		var tabs = $('.tabs').eq(0).find('.tab');
		expect(tabs.length).toBe(2);
		expect(tabs.eq(0).is('.active')).toBe(true);
		expect(tabs.eq(1).is('.active')).toBe(false);
	});

	it('If it contains multiple tabs and one of them already has the class active applied the first one should not get the class active and the other one should remain active', function() {
		$('#tabsHolder').html(markupWithSecondTabActive);
		$(document).trigger('reinitWidgets');

		expect($('.tabs').length).toBe(1);

		var tabs = $('.tabs').eq(0).find('.tab');
		expect(tabs.length).toBe(3);
		expect(tabs.eq(0).is('.active')).toBe(false);
		expect(tabs.eq(1).is('.active')).toBe(true);
		expect(tabs.eq(2).is('.active')).toBe(false);
	});

	it('Clicking on a tab trigger should show and focus the tab content and hide other tabs', function(){
		$('#tabsHolder').html(fullTabMarkup);
		$(document).trigger('reinitWidgets');

		var tabs = $('.tabs').eq(0).find('.tab'),
			trigger1 = $('#tabTrigger1'),
			trigger2 = $('#tabTrigger2'),
			content1 = $('#tabContent1'),
			content2 = $('#tabContent2');

		trigger1.click();
		expect(tabs.eq(0).is('.active')).toBe(true);
		expect(tabs.eq(1).is('.active')).toBe(false);

		trigger2.click();
		expect(tabs.eq(1).is('.active')).toBe(true);
		expect(tabs.eq(0).is('.active')).toBe(false);
	});

	it('The aria tags should reflect the active/inactive tab states', function(){
		$('#tabsHolder').html(fullTabMarkup);
		$(document).trigger('reinitWidgets');

		var tabs = $('.tabs').eq(0).find('.tab'),
			trigger1 = $('#tabTrigger1'),
			trigger2 = $('#tabTrigger2'),
			content1 = $('#tabContent1'),
			content2 = $('#tabContent2');

		//Without clicking - initial state
		expect(tabs.eq(0).is('.active')).toBe(true);

		expect(trigger1.attr('aria-selected')).toEqual('true');
		expect(trigger2.attr('aria-selected')).toEqual('false');

		expect(content1.attr('aria-expanded')).toEqual('true');
		expect(content2.attr('aria-expanded')).toEqual('false');

		expect(content1.attr('aria-hidden')).toEqual('false');
		expect(content2.attr('aria-hidden')).toEqual('true');

		//After clicking on tab 1 (Nothing should change except the content should get focus)
		trigger1.click();
		expect(tabs.eq(0).is('.active')).toBe(true);
		expect(tabs.eq(1).is('.active')).toBe(false);

		expect(trigger1.attr('aria-selected')).toEqual('true');
		expect(trigger2.attr('aria-selected')).toEqual('false');

		expect(content1.attr('aria-expanded')).toEqual('true');
		expect(content2.attr('aria-expanded')).toEqual('false');

		expect(content1.attr('aria-hidden')).toEqual('false');
		expect(content2.attr('aria-hidden')).toEqual('true');

		expect(content1[0] === document.activeElement).toBe(true);

		//After clicking on tab 2
		trigger2.click();
		expect(tabs.eq(1).is('.active')).toBe(true);
		expect(tabs.eq(0).is('.active')).toBe(false);

		expect(trigger2.attr('aria-selected')).toEqual('true');
		expect(trigger1.attr('aria-selected')).toEqual('false');

		expect(content2.attr('aria-expanded')).toEqual('true');
		expect(content1.attr('aria-expanded')).toEqual('false');

		expect(content2.attr('aria-hidden')).toEqual('false');
		expect(content1.attr('aria-hidden')).toEqual('true');

		expect(content2[0] === document.activeElement).toBe(true);
	});
});