export default async function (app) {
  let token = app.$cookie.get('Authorization')

  if (!token) {
    return app.redirect('/marketing/login')
  }
}
