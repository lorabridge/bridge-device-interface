export const vars = {
    // cms_host: import.meta.env.VITE_CMS_HOST || "127.0.0.1",
    // cms_port: import.meta.env.VITE_CMS_PORT || "1337",
    // cms_ssl: import.meta.env.VITE_CMS_SSL == "true" ? true : false,
    sse_addr: import.meta.env.VITE_SSE_ADDR || "http://127.0.0.1:8080",
    redis_conn_string: import.meta.env.VITE_REDIS_CONN_STRING || "redis://127.0.0.1:6379",
};
// vars['cms_url'] = `${vars.cms_ssl ? "https" : "http"}://${vars.cms_host}:${vars.cms_port}`;
export const config = vars;