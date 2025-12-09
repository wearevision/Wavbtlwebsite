#!/bin/bash

# Script de Verificación: Sitemaps con Datos Reales
# Verifica que los sitemaps estén usando datos del CMS, no datos de prueba

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# URLs
BASE_URL="https://ykkmplrnqcwpgfdjshxn.supabase.co/functions/v1/make-server-c4bb2206"
SITEMAP_XML="${BASE_URL}/sitemap.xml"
SITEMAP_JSON="${BASE_URL}/sitemap.json"
ROBOTS_TXT="https://wearevision.cl/robots.txt"

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   Verificación de Sitemaps con Datos Reales${NC}"
echo -e "${BLUE}   We Are Vision BTL${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}\n"

# Test 1: XML Sitemap existe y es válido
echo -e "${YELLOW}[1/10]${NC} Verificando XML Sitemap..."
if curl -s -f "${SITEMAP_XML}" > /dev/null; then
    echo -e "${GREEN}✓${NC} XML Sitemap responde correctamente"
    
    # Contar URLs
    URL_COUNT=$(curl -s "${SITEMAP_XML}" | grep -c "<loc>" || echo "0")
    echo -e "      ${BLUE}→${NC} URLs encontradas: ${URL_COUNT}"
    
    # Verificar namespace de imágenes
    if curl -s "${SITEMAP_XML}" | grep -q "xmlns:image"; then
        echo -e "${GREEN}✓${NC} Namespace de imágenes incluido"
    else
        echo -e "${RED}✗${NC} Namespace de imágenes faltante"
    fi
else
    echo -e "${RED}✗${NC} XML Sitemap no responde"
    exit 1
fi

echo ""

# Test 2: JSON Sitemap existe y es válido
echo -e "${YELLOW}[2/10]${NC} Verificando JSON Sitemap..."
if curl -s -f "${SITEMAP_JSON}" > /dev/null; then
    echo -e "${GREEN}✓${NC} JSON Sitemap responde correctamente"
else
    echo -e "${RED}✗${NC} JSON Sitemap no responde"
    exit 1
fi

echo ""

# Test 3: Versión y formato JSON
echo -e "${YELLOW}[3/10]${NC} Verificando versión de sitemap..."
VERSION=$(curl -s "${SITEMAP_JSON}" | jq -r '.version' 2>/dev/null || echo "error")
if [ "$VERSION" = "2.0" ]; then
    echo -e "${GREEN}✓${NC} Versión correcta: ${VERSION}"
else
    echo -e "${YELLOW}⚠${NC} Versión: ${VERSION} (esperada: 2.0)"
fi

echo ""

# Test 4: Portfolio Stats (DATOS REALES)
echo -e "${YELLOW}[4/10]${NC} Verificando Portfolio Stats (DATOS REALES)..."

TOTAL_EVENTS=$(curl -s "${SITEMAP_JSON}" | jq -r '.organization.portfolio_stats.total_events' 2>/dev/null || echo "0")
BRANDS_SERVED=$(curl -s "${SITEMAP_JSON}" | jq -r '.organization.portfolio_stats.brands_served' 2>/dev/null || echo "0")
CATEGORIES=$(curl -s "${SITEMAP_JSON}" | jq -r '.organization.portfolio_stats.categories' 2>/dev/null || echo "0")
PEOPLE_REACHED=$(curl -s "${SITEMAP_JSON}" | jq -r '.organization.portfolio_stats.total_people_reached' 2>/dev/null || echo "null")

echo -e "      ${BLUE}→${NC} Total eventos: ${TOTAL_EVENTS}"
echo -e "      ${BLUE}→${NC} Marcas atendidas: ${BRANDS_SERVED}"
echo -e "      ${BLUE}→${NC} Categorías: ${CATEGORIES}"
echo -e "      ${BLUE}→${NC} Personas alcanzadas: ${PEOPLE_REACHED}"

if [ "$TOTAL_EVENTS" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Stats extraídos correctamente desde CMS"
else
    echo -e "${RED}✗${NC} No se encontraron eventos en el CMS"
    exit 1
fi

echo ""

# Test 5: Featured Brands (TOP 10)
echo -e "${YELLOW}[5/10]${NC} Verificando Featured Brands..."

FEATURED_COUNT=$(curl -s "${SITEMAP_JSON}" | jq -r '.organization.featured_brands | length' 2>/dev/null || echo "0")
echo -e "      ${BLUE}→${NC} Marcas destacadas: ${FEATURED_COUNT}"

if [ "$FEATURED_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Featured brands generados correctamente"
    echo -e "      ${BLUE}Top 5:${NC}"
    curl -s "${SITEMAP_JSON}" | jq -r '.organization.featured_brands[:5] | .[]' 2>/dev/null | while read brand; do
        echo -e "         - $brand"
    done
else
    echo -e "${YELLOW}⚠${NC} No hay featured brands"
fi

echo ""

# Test 6: URLs de Eventos (verificar metadata completa)
echo -e "${YELLOW}[6/10]${NC} Verificando Metadata de Eventos..."

EVENT_COUNT=$(curl -s "${SITEMAP_JSON}" | jq '[.urls[] | select(.content_type == "case-study")] | length' 2>/dev/null || echo "0")
echo -e "      ${BLUE}→${NC} Eventos en sitemap: ${EVENT_COUNT}"

if [ "$EVENT_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Eventos incluidos correctamente"
    
    # Verificar primer evento tiene metadata completa
    FIRST_EVENT_TITLE=$(curl -s "${SITEMAP_JSON}" | jq -r '.urls[] | select(.content_type == "case-study") | .metadata.title' 2>/dev/null | head -1)
    FIRST_EVENT_BRAND=$(curl -s "${SITEMAP_JSON}" | jq -r '.urls[] | select(.content_type == "case-study") | .metadata.brand' 2>/dev/null | head -1)
    
    echo -e "      ${BLUE}Ejemplo de evento:${NC}"
    echo -e "         Título: ${FIRST_EVENT_TITLE}"
    echo -e "         Marca: ${FIRST_EVENT_BRAND}"
else
    echo -e "${RED}✗${NC} No se encontraron eventos"
    exit 1
fi

echo ""

# Test 7: Tags Enriquecidos
echo -e "${YELLOW}[7/10]${NC} Verificando Tags Enriquecidos..."

SAMPLE_TAGS=$(curl -s "${SITEMAP_JSON}" | jq -r '.urls[] | select(.content_type == "case-study") | .tags' 2>/dev/null | head -1)
TAG_COUNT=$(echo "$SAMPLE_TAGS" | jq 'length' 2>/dev/null || echo "0")

echo -e "      ${BLUE}→${NC} Tags en evento de muestra: ${TAG_COUNT}"

if [ "$TAG_COUNT" -gt 5 ]; then
    echo -e "${GREEN}✓${NC} Tags enriquecidos correctamente"
else
    echo -e "${YELLOW}⚠${NC} Pocos tags generados"
fi

echo ""

# Test 8: Keywords del CMS
echo -e "${YELLOW}[8/10]${NC} Verificando Keywords del CMS..."

EVENTS_WITH_KEYWORDS=$(curl -s "${SITEMAP_JSON}" | jq '[.urls[] | select(.content_type == "case-study" and .metadata.keywords != null)] | length' 2>/dev/null || echo "0")

echo -e "      ${BLUE}→${NC} Eventos con keywords: ${EVENTS_WITH_KEYWORDS} / ${EVENT_COUNT}"

if [ "$EVENTS_WITH_KEYWORDS" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Keywords del CMS incluidos"
else
    echo -e "${YELLOW}⚠${NC} No hay eventos con keywords en el CMS"
fi

echo ""

# Test 9: Información Geográfica
echo -e "${YELLOW}[9/10]${NC} Verificando Información Geográfica..."

EVENTS_WITH_LOCATION=$(curl -s "${SITEMAP_JSON}" | jq '[.urls[] | select(.content_type == "case-study" and .metadata.city != null)] | length' 2>/dev/null || echo "0")

echo -e "      ${BLUE}→${NC} Eventos con ciudad: ${EVENTS_WITH_LOCATION} / ${EVENT_COUNT}"

if [ "$EVENTS_WITH_LOCATION" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Datos geográficos incluidos"
    
    # Mostrar muestra de ciudades
    SAMPLE_CITIES=$(curl -s "${SITEMAP_JSON}" | jq -r '[.urls[] | select(.content_type == "case-study" and .metadata.city != null) | .metadata.city] | unique | .[:3] | .[]' 2>/dev/null)
    echo -e "      ${BLUE}Ciudades de ejemplo:${NC}"
    echo "$SAMPLE_CITIES" | while read city; do
        echo -e "         - $city"
    done
else
    echo -e "${YELLOW}⚠${NC} No hay eventos con información de ciudad"
fi

echo ""

# Test 10: Robots.txt (permite bots de IA)
echo -e "${YELLOW}[10/10]${NC} Verificando Robots.txt..."

if curl -s -f "${ROBOTS_TXT}" > /dev/null; then
    echo -e "${GREEN}✓${NC} Robots.txt accesible"
    
    # Verificar bots de IA
    if curl -s "${ROBOTS_TXT}" | grep -q "GPTBot"; then
        echo -e "${GREEN}✓${NC} GPTBot permitido"
    else
        echo -e "${RED}✗${NC} GPTBot no configurado"
    fi
    
    if curl -s "${ROBOTS_TXT}" | grep -q "PerplexityBot"; then
        echo -e "${GREEN}✓${NC} PerplexityBot permitido"
    else
        echo -e "${RED}✗${NC} PerplexityBot no configurado"
    fi
    
    if curl -s "${ROBOTS_TXT}" | grep -q "sitemap.json"; then
        echo -e "${GREEN}✓${NC} Sitemap JSON referenciado"
    else
        echo -e "${YELLOW}⚠${NC} Sitemap JSON no referenciado en robots.txt"
    fi
else
    echo -e "${RED}✗${NC} Robots.txt no accesible"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   ✓ Verificación completada${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"

echo ""
echo -e "${BLUE}Resumen:${NC}"
echo -e "   • Total eventos: ${TOTAL_EVENTS}"
echo -e "   • Marcas únicas: ${BRANDS_SERVED}"
echo -e "   • Categorías: ${CATEGORIES}"
echo -e "   • Eventos con keywords: ${EVENTS_WITH_KEYWORDS}"
echo -e "   • Eventos con ubicación: ${EVENTS_WITH_LOCATION}"

echo ""
echo -e "${BLUE}URLs para verificación manual:${NC}"
echo -e "   XML:  ${SITEMAP_XML}"
echo -e "   JSON: ${SITEMAP_JSON}"
echo ""
