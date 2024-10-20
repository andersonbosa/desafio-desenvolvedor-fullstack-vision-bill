
export async function authenticationHook(request: any, reply: any) {
  if (request.url === '/api/v1/auth/login') {
    return
  }

  try {
    await request.jwtVerify()
  } catch (err) {
    return reply.send(err)
  }
}