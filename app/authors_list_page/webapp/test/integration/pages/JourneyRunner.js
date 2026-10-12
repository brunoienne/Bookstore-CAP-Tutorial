sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"authorslistpage/test/integration/pages/AuthorsList.gen",
	"authorslistpage/test/integration/pages/AuthorsObjectPage.gen",
	"authorslistpage/test/integration/pages/BooksObjectPage.gen"
], function (JourneyRunner, AuthorsListGenerated, AuthorsObjectPageGenerated, BooksObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('authorslistpage') + '/test/flpSandbox.html#authorslistpage-tile',
        pages: {
			onTheAuthorsListGenerated: AuthorsListGenerated,
			onTheAuthorsObjectPageGenerated: AuthorsObjectPageGenerated,
			onTheBooksObjectPageGenerated: BooksObjectPageGenerated
        },
        async: true
    });

    return runner;
});

