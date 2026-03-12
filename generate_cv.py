#!/usr/bin/env python3
"""
Generate professional CV PDFs for Gamal Abdlhafez Hamood (English and Arabic versions)
"""

from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# Register fonts
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
pdfmetrics.registerFont(TTFont('SimHei', '/usr/share/fonts/truetype/chinese/SimHei.ttf'))
registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')

def create_english_cv():
    """Create English CV"""
    output_path = '/home/z/my-project/public/cv/gamal-hamood-cv.pdf'
    
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=1.5*cm,
        leftMargin=1.5*cm,
        topMargin=1.5*cm,
        bottomMargin=1.5*cm,
        title='Gamal_Abdlhafez_Hamood_CV',
        author='Z.ai',
        creator='Z.ai',
        subject='Professional CV - Eng. Gamal Abdlhafez Hamood'
    )
    
    styles = getSampleStyleSheet()
    
    # Header styles
    name_style = ParagraphStyle('NameStyle', parent=styles['Normal'], fontName='Times New Roman',
        fontSize=24, leading=30, alignment=TA_CENTER, textColor=colors.HexColor('#1a1a1a'), spaceAfter=6)
    
    title_style = ParagraphStyle('TitleStyle', parent=styles['Normal'], fontName='Times New Roman',
        fontSize=14, leading=18, alignment=TA_CENTER, textColor=colors.HexColor('#d4af37'), spaceAfter=12)
    
    contact_style = ParagraphStyle('ContactStyle', parent=styles['Normal'], fontName='Times New Roman',
        fontSize=10, leading=14, alignment=TA_CENTER, textColor=colors.HexColor('#666666'), spaceAfter=20)
    
    section_style = ParagraphStyle('SectionStyle', parent=styles['Normal'], fontName='Times New Roman',
        fontSize=13, leading=18, textColor=colors.HexColor('#d4af37'), spaceBefore=15, spaceAfter=8)
    
    body_style = ParagraphStyle('BodyStyle', parent=styles['Normal'], fontName='Times New Roman',
        fontSize=10.5, leading=15, alignment=TA_JUSTIFY, textColor=colors.HexColor('#333333'), spaceAfter=8)
    
    skill_style = ParagraphStyle('SkillStyle', parent=styles['Normal'], fontName='Times New Roman',
        fontSize=10, leading=14, textColor=colors.HexColor('#333333'))
    
    story = []
    
    # Header
    story.append(Paragraph('<b>ENG. GAMAL ABDLHAFEZ HAMOOD</b>', name_style))
    story.append(Paragraph('Graphic Designer & Web Designer', title_style))
    
    contact_info = '''Riyadh, Saudi Arabia | +966 55 296 2213 | gamalabdlhafez263@gmail.com<br/>
LinkedIn: linkedin.com/in/gamal-abdlhafez-2b9436289 | WhatsApp: wa.me/966552962213'''
    story.append(Paragraph(contact_info, contact_style))
    
    # Summary
    story.append(Paragraph('<b>PROFESSIONAL SUMMARY</b>', section_style))
    summary = '''Creative and detail-oriented digital designer with a Bachelor's degree in Software Engineering. 
Experienced in graphic design, social media design, website design, responsive interfaces, and 
AI-assisted digital workflows. Combines visual creativity with technical understanding to build 
digital experiences that support branding, usability, and engagement.'''
    story.append(Paragraph(summary, body_style))
    
    # Skills
    story.append(Paragraph('<b>SKILLS</b>', section_style))
    story.append(Paragraph('<b>Design:</b> Graphic Design, Social Media Design, Website Design, UI/UX Fundamentals, Responsive Web Design, Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Canva', skill_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph('<b>Development:</b> HTML, CSS, JavaScript, React, Bootstrap, PHP, Laravel, MySQL, REST APIs', skill_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph('<b>Tools & Workflow:</b> AI Prompt Engineering, Git & GitHub, Microsoft Word, Excel, PowerPoint, Access', skill_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph('<b>Professional Skills:</b> Creative Problem Solving, Time Management, Team Coordination, Client Support, Communication, Fast Learning', skill_style))
    
    # Experience
    story.append(Paragraph('<b>EXPERIENCE</b>', section_style))
    exp = '''<b>Digital Design & Web Projects</b> | Independent / Practical Projects<br/><br/>
Hands-on experience in UI-focused web design, graphic design systems, digital content creation, 
responsive websites, usability improvement, interface organization, and branding support through visuals.'''
    story.append(Paragraph(exp, body_style))
    
    # Projects
    story.append(Paragraph('<b>KEY PROJECTS</b>', section_style))
    story.append(Paragraph('<b>Sky Najd</b> (skynajd.com) - Web Designer / Digital Designer', body_style))
    story.append(Paragraph('A professional business website with modern layout and clean branding.', body_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph('<b>Dahanat KSA</b> (dahanatksa.com) - Web Designer / Brand-Focused Digital Designer', body_style))
    story.append(Paragraph('A modern commercial website with strong visual identity.', body_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph('<b>Jarash</b> (jarash.gt.tc) - Website Designer / Frontend-Focused Digital Creative', body_style))
    story.append(Paragraph('A live website showcasing practical website design and responsive UX.', body_style))
    
    # Education
    story.append(Paragraph('<b>EDUCATION</b>', section_style))
    story.append(Paragraph('<b>Bachelor of Software Engineering</b><br/>Taiz University, Yemen | Graduated: July 2024', body_style))
    
    # Languages
    story.append(Paragraph('<b>LANGUAGES</b>', section_style))
    story.append(Paragraph('Arabic: Native | English: Very Good', skill_style))
    
    doc.build(story)
    print(f"English CV created: {output_path}")

def create_arabic_cv():
    """Create Arabic CV"""
    output_path = '/home/z/my-project/public/cv/gamal-hamood-cv-ar.pdf'
    
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=1.5*cm,
        leftMargin=1.5*cm,
        topMargin=1.5*cm,
        bottomMargin=1.5*cm,
        title='سيرة_ذاتية_جمال_عبدالحفيز_حمود',
        author='Z.ai',
        creator='Z.ai',
        subject='السيرة الذاتية - م. جمال عبدالحفيز حمود'
    )
    
    styles = getSampleStyleSheet()
    
    # Arabic styles (right-to-left)
    name_style = ParagraphStyle('NameStyleAR', parent=styles['Normal'], fontName='SimHei',
        fontSize=24, leading=30, alignment=TA_CENTER, textColor=colors.HexColor('#1a1a1a'), spaceAfter=6)
    
    title_style = ParagraphStyle('TitleStyleAR', parent=styles['Normal'], fontName='SimHei',
        fontSize=14, leading=18, alignment=TA_CENTER, textColor=colors.HexColor('#d4af37'), spaceAfter=12)
    
    contact_style = ParagraphStyle('ContactStyleAR', parent=styles['Normal'], fontName='SimHei',
        fontSize=10, leading=14, alignment=TA_CENTER, textColor=colors.HexColor('#666666'), spaceAfter=20)
    
    section_style = ParagraphStyle('SectionStyleAR', parent=styles['Normal'], fontName='SimHei',
        fontSize=13, leading=18, textColor=colors.HexColor('#d4af37'), spaceBefore=15, spaceAfter=8)
    
    body_style = ParagraphStyle('BodyStyleAR', parent=styles['Normal'], fontName='SimHei',
        fontSize=10.5, leading=15, alignment=TA_RIGHT, textColor=colors.HexColor('#333333'), spaceAfter=8, wordWrap='CJK')
    
    skill_style = ParagraphStyle('SkillStyleAR', parent=styles['Normal'], fontName='SimHei',
        fontSize=10, leading=14, textColor=colors.HexColor('#333333'), alignment=TA_RIGHT, wordWrap='CJK')
    
    story = []
    
    # Header
    story.append(Paragraph('<b>م. جمال عبدالحفيز حمود</b>', name_style))
    story.append(Paragraph('مصمم جرافيك ومصمم ويب', title_style))
    
    contact_info = '''الرياض، المملكة العربية السعودية | 966552962213+ | gamalabdlhafez263@gmail.com<br/>
لينكدإن: linkedin.com/in/gamal-abdlhafez-2b9436289 | واتساب: wa.me/966552962213'''
    story.append(Paragraph(contact_info, contact_style))
    
    # Summary
    story.append(Paragraph('<b>الملخص المهني</b>', section_style))
    summary = '''مصمم رقمي مبدع ودقيق يحمل درجة البكالوريوس في هندسة البرمجيات. خبرة في التصميم الجرافيكي، 
تصميم وسائل التواصل الاجتماعي، تصميم المواقع، الواجهات المتجاوبة، وسير العمل الرقمي المعزز بالذكاء الاصطناعي. 
يجمع بين الإبداع البصري والفهم التقني لبناء تجارب رقمية.'''
    story.append(Paragraph(summary, body_style))
    
    # Skills
    story.append(Paragraph('<b>المهارات</b>', section_style))
    story.append(Paragraph('<b>التصميم:</b> التصميم الجرافيكي، تصميم وسائل التواصل، تصميم المواقع، أساسيات UI/UX، التصميم المتجاوب، أدوبي فوتوشوب، أدوبي إليستريتور، أدوبي إنديزاين، كانفا', skill_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph('<b>التطوير:</b> HTML، CSS، JavaScript، React، Bootstrap، PHP، Laravel، MySQL، REST APIs', skill_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph('<b>الأدوات:</b> هندسة الأوامر بالذكاء الاصطناعي، Git & GitHub، مايكروسوفت وورد، إكسل، باوربوينت، أكسس', skill_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph('<b>المهارات المهنية:</b> حل المشكلات الإبداعي، إدارة الوقت، التنسيق الجماعي، دعم العملاء، التواصل، التعلم السريع', skill_style))
    
    # Experience
    story.append(Paragraph('<b>الخبرة</b>', section_style))
    exp = '''<b>مشاريع التصميم الرقمي والويب</b> | مشاريع مستقلة / عملية<br/><br/>
خبرة عملية في تصميم الويب المركز على واجهة المستخدم، أنظمة التصميم الجرافيكي، إنشاء المحتوى الرقمي، 
المواقع المتجاوبة، تحسين قابلية الاستخدام، تنظيم الواجهات، ودعم العلامة التجارية.'''
    story.append(Paragraph(exp, body_style))
    
    # Projects
    story.append(Paragraph('<b>المشاريع الرئيسية</b>', section_style))
    story.append(Paragraph('<b>سكي نجد</b> (skynajd.com) - مصمم ويب / مصمم رقمي', body_style))
    story.append(Paragraph('موقع أعمال احترافي بتخطيط حديث وهوية بصرية نظيفة.', body_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph('<b>دهانات KSA</b> (dahanatksa.com) - مصمم ويب / مصمم رقمي', body_style))
    story.append(Paragraph('موقع تجاري حديث بهوية بصرية قوية.', body_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph('<b>جرش</b> (jarash.gt.tc) - مصمم مواقع / مبدع رقمي', body_style))
    story.append(Paragraph('موقع مباشر يعرض تصميم المواقع العملية.', body_style))
    
    # Education
    story.append(Paragraph('<b>التعليم</b>', section_style))
    story.append(Paragraph('<b>بكالوريوس هندسة البرمجيات</b><br/>جامعة تعز، اليمن | تخرج: يوليو 2024', body_style))
    
    # Languages
    story.append(Paragraph('<b>اللغات</b>', section_style))
    story.append(Paragraph('العربية: اللغة الأم | الإنجليزية: جيد جداً', skill_style))
    
    doc.build(story)
    print(f"Arabic CV created: {output_path}")

if __name__ == '__main__':
    create_english_cv()
    create_arabic_cv()
    print("\nBoth CV PDFs generated successfully!")
