import Redis from "ioredis";

const redisClient = () => {
    if (process.env.REDIS_URL) {
        const client = new Redis(process.env.REDIS_URL, {
            maxRetriesPerRequest: 1,
            retryStrategy: () => null, // Don't retry indefinitely
            connectTimeout: 500, // Fast fail
        });

        client.on('error', (err) => {
            // Silently log errors to prevent crashing
            if (process.env.NODE_ENV !== 'production') {
                console.warn('Redis connection issue:', err.message);
            }
        });

        return client;
    }
    return null;
};

const globalForRedis = global as unknown as { redis: Redis | null };
const instance = globalForRedis.redis || redisClient();
if (process.env.NODE_ENV !== "production") globalForRedis.redis = instance;

export const redis = instance;

// Helper to use Redis safely
export const getCachedData = async <T>(key: string): Promise<T | null> => {
    if (!redis) return null;
    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
};

export const setCachedData = async (key: string, data: any, ttlSecond: number = 60) => {
    if (!redis) return;
    try {
        await redis.set(key, JSON.stringify(data), "EX", ttlSecond);
    } catch (e) {
        // ignore
    }
};

export const invalidateCache = async (key: string) => {
    if (!redis) return;
    try {
        await redis.del(key);
    } catch (e) {
        // ignore
    }
};
