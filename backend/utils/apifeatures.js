class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword;
    const fieldName = this.queryStr.fields;
    const fieldArray = fieldName  ? fieldName.split(',') : [];
    if (keyword && fieldArray.length > 0) {
      const keywordFilter = {
        $or: fieldArray.map((field) => ({
          [field]: { $regex: keyword, $options: 'i' },
        })),
      };
      this.query = this.query.find(keywordFilter);
      
    }
    return this;
  }
  
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
  
}

module.exports = ApiFeatures;
