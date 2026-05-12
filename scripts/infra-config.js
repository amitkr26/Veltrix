/**
 * Veltrix Infrastructure Schema Configuration
 * Centralized definition for collections, attributes, and indexes.
 */
module.exports = {
  COLLECTIONS: [
    {
      name: 'Users',
      id: 'users',
      permissions: ['read("any")', 'create("users")', 'update("users")', 'delete("users")'],
      attributes: [
        { key: 'accountId', type: 'string', size: 255, required: true },
        { key: 'username', type: 'string', size: 100, required: true },
        { key: 'email', type: 'string', size: 255, required: true },
        { key: 'avatar', type: 'string', size: 500, required: false },
        { key: 'bio', type: 'string', size: 1000, required: false },
      ],
      indexes: [
        { key: 'idx_account', type: 'unique', attributes: ['accountId'] },
        { key: 'idx_username', type: 'key', attributes: ['username'] },
      ]
    },
    {
      name: 'Posts',
      id: 'posts',
      permissions: ['read("any")', 'create("users")', 'update("users")', 'delete("users")'],
      attributes: [
        { key: 'title', type: 'string', size: 255, required: true },
        { key: 'thumbnail', type: 'string', size: 500, required: true },
        { key: 'video', type: 'string', size: 500, required: true },
        { key: 'prompt', type: 'string', size: 2000, required: false },
        { key: 'creator', type: 'string', size: 255, required: true },
        { key: 'category', type: 'string', size: 100, required: false },
        { key: 'likesCount', type: 'integer', required: false, default: 0 },
        { key: 'commentsCount', type: 'integer', required: false, default: 0 },
      ],
      indexes: [
        { key: 'idx_title', type: 'fulltext', attributes: ['title'] },
        { key: 'idx_creator', type: 'key', attributes: ['creator'] },
        { key: 'idx_category', type: 'key', attributes: ['category'] },
      ]
    },
    {
      name: 'Comments',
      id: 'comments',
      permissions: ['read("any")', 'create("users")', 'update("users")', 'delete("users")'],
      attributes: [
        { key: 'postId', type: 'string', size: 255, required: true },
        { key: 'userId', type: 'string', size: 255, required: true },
        { key: 'text', type: 'string', size: 5000, required: true },
      ],
      indexes: [
        { key: 'idx_post', type: 'key', attributes: ['postId'] },
      ]
    },
    {
      name: 'Social',
      id: 'social',
      permissions: ['read("any")', 'create("users")', 'update("users")', 'delete("users")'],
      attributes: [
        { key: 'followerId', type: 'string', size: 255, required: true },
        { key: 'followingId', type: 'string', size: 255, required: true },
      ],
      indexes: [
        { key: 'idx_follower', type: 'key', attributes: ['followerId'] },
        { key: 'idx_following', type: 'key', attributes: ['followingId'] },
      ]
    },
    {
      name: 'Notifications',
      id: 'notifications',
      permissions: ['read("users")', 'create("users")', 'update("users")', 'delete("users")'],
      attributes: [
        { key: 'userId', type: 'string', size: 255, required: true },
        { key: 'type', type: 'string', size: 50, required: true },
        { key: 'message', type: 'string', size: 500, required: true },
        { key: 'link', type: 'string', size: 500, required: false },
      ],
      indexes: [
        { key: 'idx_notif_user', type: 'key', attributes: ['userId'] },
      ]
    },
    {
      name: 'Bookmarks',
      id: 'bookmarks',
      permissions: ['read("users")', 'create("users")', 'delete("users")'],
      attributes: [
        { key: 'userId', type: 'string', size: 255, required: true },
        { key: 'postId', type: 'string', size: 255, required: true },
      ],
      indexes: [
        { key: 'idx_bookmark_user', type: 'key', attributes: ['userId'] },
      ]
    },
    {
      name: 'Reports',
      id: 'reports',
      permissions: ['create("users")'],
      attributes: [
        { key: 'targetId', type: 'string', size: 255, required: true },
        { key: 'reporterId', type: 'string', size: 255, required: true },
        { key: 'reason', type: 'string', size: 1000, required: true },
        { key: 'status', type: 'string', size: 50, required: false, default: 'pending' },
      ],
      indexes: []
    }
  ],
  BUCKETS: [
    {
      id: 'media',
      name: 'Media Assets',
      permissions: ['read("any")', 'create("users")', 'update("users")', 'delete("users")'],
      fileSecurity: true,
      maxFileSize: 50000000, // 50MB
      allowedExtensions: ['jpg', 'png', 'mp4', 'mov', 'webp'],
    }
  ]
};
