module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/thumbnail.png",
        destination: "/api/thumbnail",
      },
    ]
  },
}