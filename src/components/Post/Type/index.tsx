import { LensterPost } from '@generated/lenstertypes'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import Collected from './Collected'
import Commented from './Commented'
import CommunityPost from './CommunityPost'
import Mirrored from './Mirrored'

interface Props {
  post: LensterPost
  hideType?: boolean
}

const PostType: FC<Props> = ({ post, hideType }) => {
  const { pathname } = useRouter()
  const postType = post?.metadata?.attributes[0]?.value
  const isCollected = !!post?.collectedBy

  return (
    <>
      {post?.__typename === 'Mirror' && <Mirrored post={post} />}
      {post?.__typename === 'Comment' &&
        !hideType &&
        !isCollected &&
        postType !== 'community post' && <Commented post={post} />}
      {postType === 'community post' &&
        pathname !== '/communities/[id]' &&
        post?.__typename !== 'Mirror' && <CommunityPost post={post} />}
      {isCollected && postType !== 'community' && postType !== 'crowdfund' && (
        <Collected post={post} type="Collected" />
      )}
      {isCollected && postType === 'crowdfund' && (
        <Collected post={post} type="Funded" />
      )}
    </>
  )
}

export default PostType
