// eslint-disable-next-line no-unused-vars
class APIFeatures {
  constructor(query, queryString) {
    //Mongoose query and queryString (url)
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...this.queryString };
    ////Using destructuring to make a hard copy of the req.query object
    //This is to avoid modifying the original req.query
    //queryObj = { duration: '5', difficulty: 'easy' }

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    //1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj); //Here we convert query object to string to perform
    //replacements in line 20, in line 22 we convert it back to JSON

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt\b)/g, match => `$${match}`);
    //console.log(JSON.parse(queryStr));
    this.query = this.query.find(JSON.parse(queryStr));
    //this.query = Tours.find().find(JSON.parse(queryStr)
    return this;

    //let query = Tour.find(JSON.parse(queryStr));
  }

  sort() {
    if (this.queryString.sort) {
      //If there's a sort property
      const sortBy = this.queryString.sort.split(',').join(' ');
      //console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skipValue = (page - 1) * limit;
    this.query = this.query.skip(skipValue).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
