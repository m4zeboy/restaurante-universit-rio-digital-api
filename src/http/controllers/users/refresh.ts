import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  const token = await reply.jwtSign(
    {
      role: request.user.role,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )
  const refreshToken = await reply.jwtSign(
    {
      role: request.user.role,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      sameSite: true,
      secure: true,
      httpOnly: true,
    })
    .status(201)
    .send({ token })
}
