//const { Books } = require('#cds-models/BookstoreService')
const { Genre } = require('#cds-models/tutorial/db');
const cds = require('@sap/cds')

module.exports = class BookstoreService extends cds.ApplicationService {
  init() {
    const { Books } = cds.entities('BookstoreService')
    const { Authors } = cds.entities('BookstoreService')

    this.on('addStock', Books, async (req) => {
      const { ID } = req.params[0];

      const book = await SELECT.one
        .from('tutorial.db.Books')
        .columns('ID', 'stock')
        .where({ ID });

      if (!book) {
        return req.error(404, 'Book not found');
      }

      await UPDATE('tutorial.db.Books')
        .set({ stock: (book.stock ?? 0) + 1 })
        .where({ ID });

    })

    this.on('changePublishedDate', Books, async (req) => {
      const { ID } = req.params[0];
      const newDate = req.data.newDate;

      await UPDATE('tutorial.db.Books')
        .set({ publishedAt: newDate })
        .where({ ID });

    })

    this.on('changeStatus', Books, async (req) => {
      const bookId = req.params[0].ID
      const newStatus = req.data.newStatus;

      await UPDATE('tutorial.db.Books')
        .set({ status_code: newStatus })
        .where({ ID: bookId });

    })

    this.on('addDiscount', async () => {
      await UPDATE(Books).set({
        price: {
          func: 'ROUND',
          args: [{
            xpr: [{ ref: ['price'] }, '*',
            { val: 0.9 }]
          },
          { val: 2 }]
        }
      })
    })

    this.before('READ', Books, async (req) => {
      console.log('Before READ books')
    })
    this.after('READ', Books, async (books, req) => {
      for (const book of books) {
        if (book.genre_code === Genre.Fantasy) {
          book.price = book.price * 0.8;
        }
      }
    })

    this.after('READ', Authors, async (authors) => {
      const ids = authors.map(author => author.ID)
      const bookCount = await SELECT
        .from('tutorial.db.Books').columns('author_ID', { func: 'count', args: [{ val: 1 }], as: 'count' })
        .where({ author_ID: { in: ids } })
        .groupBy('author_ID');
        
      for (const author of authors) {
        author.bookCount = bookCount.find(
          book => book.author_ID === author.ID
        )?.count ?? 0;
      }
    })

    return super.init()
  }
}
