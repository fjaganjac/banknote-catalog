class NoDataError extends Error { 
  constructor() {
    super(`no-data`);
    this.name = 'noDataError';
  }
}