function filterFalsyProps(obj) {
  return Object.entries(obj).reduce(
    (filteredObj, [key, value]) =>
      value ? Object.assign(filteredObj, { [key]: value }) : filteredObj,
    {}
  );
}

module.exports = { filterFalsyProps };
